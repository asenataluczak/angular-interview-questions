const fs = require("fs");

fs.readFile("questions.json", function (err, data) {
  if (err) throw err;

  const questions = JSON.parse(data);
  const questionsFormatted = getQuestionsFormatted(questions);

  fs.writeFile("README.md", questionsFormatted, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});

function getQuestionsFormatted(q) {
  const formattedDomains = q.data.map(
    (domain) => `## ${domain.domain}\n\n` + getDomainQuestionsFormatted(domain),
  );
  return `# Angular Interview Questions\n\n` + formattedDomains.join("");
}

function getDomainQuestionsFormatted(domain) {
  return domain.questions
    .map(
      (question) =>
        `### ${question.question}\n<details><summary>Answer</summary>${question.answer || "wip"}</details>`,
    )
    .join("\n\n");
}
