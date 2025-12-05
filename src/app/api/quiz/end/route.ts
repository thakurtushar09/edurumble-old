import dbConnect from "@/lib/dbConnect";
import { QuizModel } from "@/Models/quizModel";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { quizId } = await req.json();

    if (!quizId) {
      return Response.json(
        {
          success: false,
          message: "quizId is required",
        },
        { status: 400 }
      );
    }

    const updatedQuiz = await QuizModel.findByIdAndUpdate(
      quizId,                 
      { isLive: false },
      { new: true }     
    );

    if (!updatedQuiz) {
      return Response.json(
        {
          success: false,
          message: "Quiz is invalid",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Quiz has been ended",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error ending quiz:", error);
    return Response.json(
      {
        success: false,
        message: `message : ${error}`,
      },
      { status: 500 }
    );
  }
}
