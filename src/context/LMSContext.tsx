"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  LMSUser,
  EducationalMaterial,
  Quiz,
  MaterialViewRecord,
  QuizAttemptRecord,
  UserRole,
  INITIAL_USERS,
  INITIAL_MATERIALS,
  INITIAL_QUIZZES,
  INITIAL_VIEW_RECORDS,
  INITIAL_ATTEMPT_RECORDS,
} from "@/data/lmsData";

interface LMSContextType {
  currentUser: LMSUser | null;
  users: LMSUser[];
  materials: EducationalMaterial[];
  quizzes: Quiz[];
  viewRecords: MaterialViewRecord[];
  attemptRecords: QuizAttemptRecord[];
  isLoading: boolean;
  loginAs: (user: LMSUser) => void;
  loginAsDemo: (role: UserRole) => void;
  registerUser: (name: string, email: string, role: UserRole) => Promise<LMSUser>;
  logout: () => void;
  recordMaterialView: (materialId: string) => Promise<void>;
  submitQuiz: (
    quizId: string,
    selectedAnswers: { [questionId: string]: number }
  ) => Promise<QuizAttemptRecord>;
  resetDemoData: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const LMSContext = createContext<LMSContextType | undefined>(undefined);

export function LMSProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<LMSUser | null>(null);
  const [users, setUsers] = useState<LMSUser[]>(INITIAL_USERS);
  const [materials, setMaterials] = useState<EducationalMaterial[]>(INITIAL_MATERIALS);
  const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
  const [viewRecords, setViewRecords] = useState<MaterialViewRecord[]>(INITIAL_VIEW_RECORDS);
  const [attemptRecords, setAttemptRecords] = useState<QuizAttemptRecord[]>(INITIAL_ATTEMPT_RECORDS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshData = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/data");
      if (res.ok) {
        const data = await res.json();
        if (data.users) setUsers(data.users);
        if (data.materials) setMaterials(data.materials);
        if (data.quizzes) setQuizzes(data.quizzes);
        if (data.viewRecords) setViewRecords(data.viewRecords);
        if (data.attemptRecords) setAttemptRecords(data.attemptRecords);
      }
    } catch (err) {
      console.warn("Could not fetch remote LMS data, using cached local state:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // 1. Restore logged-in user from localStorage
    try {
      const savedUser = localStorage.getItem("lms_current_user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        // Default to Demo Student (Alex Morgan) for seamless preview
        const defaultStudent = INITIAL_USERS.find((u) => u.role === "student") || INITIAL_USERS[1];
        setCurrentUser(defaultStudent);
        localStorage.setItem("lms_current_user", JSON.stringify(defaultStudent));
      }
    } catch {
      // ignore localStorage errors
    }

    // 2. Fetch latest data from API
    refreshData();
  }, [refreshData]);

  const loginAs = (user: LMSUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem("lms_current_user", JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const loginAsDemo = (role: UserRole) => {
    const demo = users.find((u) => u.role === role) || INITIAL_USERS.find((u) => u.role === role);
    if (demo) {
      loginAs(demo);
    }
  };

  const registerUser = async (name: string, email: string, role: UserRole): Promise<LMSUser> => {
    try {
      const res = await fetch("/api/portal/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "REGISTER_USER", name, email, role }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUsers((prev) => [...prev.filter((u) => u.id !== data.user.id), data.user]);
        loginAs(data.user);
        return data.user;
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }

    // Fallback local registration
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const localUser: LMSUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      avatar: initials || "ST",
      enrolledAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, localUser]);
    loginAs(localUser);
    return localUser;
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("lms_current_user");
    } catch {
      // ignore
    }
  };

  const recordMaterialView = async (materialId: string) => {
    if (!currentUser || currentUser.role !== "student") return;

    try {
      const res = await fetch("/api/portal/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "VIEW_MATERIAL",
          userId: currentUser.id,
          materialId,
        }),
      });
      const data = await res.json();
      if (data.success && data.viewRecords) {
        setViewRecords(data.viewRecords);
        return;
      }
    } catch (err) {
      console.warn("View recording offline fallback:", err);
    }

    // Local fallback
    const targetMat = materials.find((m) => m.id === materialId);
    if (!targetMat) return;

    const now = new Date().toISOString();
    setViewRecords((prev) => {
      const existingIdx = prev.findIndex(
        (v) => v.userId === currentUser.id && v.materialId === materialId
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].viewCount += 1;
        copy[existingIdx].lastViewedAt = now;
        return copy;
      } else {
        const newRecord: MaterialViewRecord = {
          id: `view-${Date.now()}`,
          userId: currentUser.id,
          studentName: currentUser.name,
          studentEmail: currentUser.email,
          materialId: targetMat.id,
          materialTitle: targetMat.title,
          category: targetMat.category,
          firstViewedAt: now,
          lastViewedAt: now,
          viewCount: 1,
        };
        return [...prev, newRecord];
      }
    });
  };

  const submitQuiz = async (
    quizId: string,
    selectedAnswers: { [questionId: string]: number }
  ): Promise<QuizAttemptRecord> => {
    if (!currentUser) throw new Error("User must be logged in to take quiz");

    try {
      const res = await fetch("/api/portal/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SUBMIT_QUIZ",
          userId: currentUser.id,
          quizId,
          selectedAnswers,
        }),
      });
      const data = await res.json();
      if (data.success && data.attempt) {
        setAttemptRecords((prev) => [data.attempt, ...prev]);
        return data.attempt;
      }
    } catch (err) {
      console.warn("Quiz submit offline fallback:", err);
    }

    // Local fallback calculation
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) throw new Error("Quiz not found");

    const previousAttempts = attemptRecords.filter(
      (a) => a.userId === currentUser.id && a.quizId === quizId
    );
    const attemptNumber = previousAttempts.length + 1;

    let correctCount = 0;
    const answerDetails = quiz.questions.map((q) => {
      const selected = selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1;
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount += 1;

      return {
        questionId: q.id,
        questionText: q.question,
        options: q.options,
        selectedOption: selected,
        correctOption: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    const localAttempt: QuizAttemptRecord = {
      id: `attempt-${Date.now()}`,
      quizId: quiz.id,
      quizTitle: quiz.title,
      category: quiz.category,
      userId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      attemptNumber,
      score,
      totalQuestions: quiz.questions.length,
      correctCount,
      passed,
      completedAt: new Date().toISOString(),
      answers: answerDetails,
    };

    setAttemptRecords((prev) => [localAttempt, ...prev]);
    return localAttempt;
  };

  const resetDemoData = async () => {
    try {
      await fetch("/api/portal/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "RESET_DEMO" }),
      });
    } catch {
      // ignore
    }
    setUsers(INITIAL_USERS);
    setMaterials(INITIAL_MATERIALS);
    setQuizzes(INITIAL_QUIZZES);
    setViewRecords(INITIAL_VIEW_RECORDS);
    setAttemptRecords(INITIAL_ATTEMPT_RECORDS);
  };

  return (
    <LMSContext.Provider
      value={{
        currentUser,
        users,
        materials,
        quizzes,
        viewRecords,
        attemptRecords,
        isLoading,
        loginAs,
        loginAsDemo,
        registerUser,
        logout,
        recordMaterialView,
        submitQuiz,
        resetDemoData,
        refreshData,
      }}
    >
      {children}
    </LMSContext.Provider>
  );
}

export function useLMS() {
  const context = useContext(LMSContext);
  if (!context) {
    throw new Error("useLMS must be used within an LMSProvider");
  }
  return context;
}
