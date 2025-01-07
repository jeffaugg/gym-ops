import AppError from "../../../shared/errors/AppError";
import mailQueue from "../../../shared/infra/queues/mailQueue";

export async function enqueueEmails(
  emails: string[],
  subject: string,
  body: string,
): Promise<void> {
  const results = await Promise.allSettled(
    emails.map((email) =>
      mailQueue.add({
        to: email,
        subject,
        body,
      }),
    ),
  );

  const errors: string[] = [];
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      errors.push(`Erro ao enviar email para ${emails[index]}`);
    }
  });

  if (errors.length > 0) {
    const err = errors.join(", ");
    throw new AppError(err, 500);
  }
}
