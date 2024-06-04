import { Inter } from "next/font/google";
import "./globals.css";
import RespondentlistState from "./context/RespondentlistState";
import McqsState from "./context/McqsState";
import QuestionsState from "./context/QuestionsState";
import TestState from "./context/TestState";
import ResponseState from "./context/ResponseState";
import AnswersState from "./context/AnwersState";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Testingninja",
  description: "AI based skill testing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AnswersState>
          <ResponseState>
            <TestState>
              <QuestionsState>
                <McqsState>
                  <RespondentlistState>{children}</RespondentlistState>
                </McqsState>
              </QuestionsState>
            </TestState>
          </ResponseState>
        </AnswersState>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/datepicker.min.js"
          async
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"
          async
        />
      </body>
    </html>
  );
}
