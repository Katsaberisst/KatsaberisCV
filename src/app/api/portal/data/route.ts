import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  INITIAL_USERS,
  INITIAL_MATERIALS,
  INITIAL_QUIZZES,
  INITIAL_VIEW_RECORDS,
  INITIAL_ATTEMPT_RECORDS,
  LMSUser,
  EducationalMaterial,
  Quiz,
  MaterialViewRecord,
  QuizAttemptRecord,
  QuizAnswerDetail,
} from "@/data/lmsData";

interface LMSStore {
  users: LMSUser[];
  materials: EducationalMaterial[];
  quizzes: Quiz[];
  viewRecords: MaterialViewRecord[];
  attemptRecords: QuizAttemptRecord[];
}

const STORE_PATH = path.join(process.cwd(), "src", "data", "lms-store.json");

function getInitialStore(): LMSStore {
  return {
    users: [...INITIAL_USERS],
    materials: [...INITIAL_MATERIALS],
    quizzes: [...INITIAL_QUIZZES],
    viewRecords: [...INITIAL_VIEW_RECORDS],
    attemptRecords: [...INITIAL_ATTEMPT_RECORDS],
  };
}

function readStore(): LMSStore {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const content = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading LMS store file, using fallback:", err);
  }
  const defaultData = getInitialStore();
  writeStore(defaultData);
  return defaultData;
}

function writeStore(data: LMSStore): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to LMS store file:", err);
  }
}

export async function GET() {
  const store = readStore();
  return NextResponse.json(store);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;
    const store = readStore();

    if (action === "RESET_DEMO") {
      const fresh = getInitialStore();
      writeStore(fresh);
      return NextResponse.json({ success: true, store: fresh });
    }

    if (action === "REGISTER_USER") {
      const { name, email, role } = body;
      if (!name || !email || !role) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      // Check if user already exists
      let user = store.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        const initials = name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        user = {
          id: `user-${Date.now()}`,
          name,
          email,
          role,
          avatar: initials || "ST",
          enrolledAt: new Date().toISOString(),
        };
        store.users.push(user);
        writeStore(store);
      }
      return NextResponse.json({ success: true, user, store });
    }

    if (action === "VIEW_MATERIAL") {
      const { userId, materialId } = body;
      const user = store.users.find((u) => u.id === userId);
      const material = store.materials.find((m) => m.id === materialId);

      if (!user || !material) {
        return NextResponse.json({ error: "User or Material not found" }, { status: 404 });
      }

      const existingRecordIndex = store.viewRecords.findIndex(
        (v) => v.userId === userId && v.materialId === materialId
      );

      const now = new Date().toISOString();

      if (existingRecordIndex >= 0) {
        store.viewRecords[existingRecordIndex].viewCount += 1;
        store.viewRecords[existingRecordIndex].lastViewedAt = now;
      } else {
        const newRecord: MaterialViewRecord = {
          id: `view-${Date.now()}`,
          userId: user.id,
          studentName: user.name,
          studentEmail: user.email,
          materialId: material.id,
          materialTitle: material.title,
          category: material.category,
          firstViewedAt: now,
          lastViewedAt: now,
          viewCount: 1,
        };
        store.viewRecords.push(newRecord);
      }

      writeStore(store);
      return NextResponse.json({ success: true, viewRecords: store.viewRecords });
    }

    if (action === "SUBMIT_QUIZ") {
      const { userId, quizId, selectedAnswers } = body;
      // selectedAnswers: { [questionId: string]: number }

      const user = store.users.find((u) => u.id === userId);
      const quiz = store.quizzes.find((q) => q.id === quizId);

      if (!user || !quiz) {
        return NextResponse.json({ error: "User or Quiz not found" }, { status: 404 });
      }

      // Calculate attempt number for this student on this quiz
      const previousAttempts = store.attemptRecords.filter(
        (a) => a.userId === userId && a.quizId === quizId
      );
      const attemptNumber = previousAttempts.length + 1;

      let correctCount = 0;
      const answerDetails: QuizAnswerDetail[] = quiz.questions.map((q) => {
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

      const newAttempt: QuizAttemptRecord = {
        id: `attempt-${Date.now()}`,
        quizId: quiz.id,
        quizTitle: quiz.title,
        category: quiz.category,
        userId: user.id,
        studentName: user.name,
        studentEmail: user.email,
        attemptNumber,
        score,
        totalQuestions: quiz.questions.length,
        correctCount,
        passed,
        completedAt: new Date().toISOString(),
        answers: answerDetails,
      };

      store.attemptRecords.unshift(newAttempt);
      writeStore(store);

      return NextResponse.json({ success: true, attempt: newAttempt, store });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("API Error in /api/portal/data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
