const fs = require("fs");
const yaml = require("js-yaml");
const listOfDefaultContributionTypes = require("./default-types");

try {
  const fileContents = fs.readFileSync(".all-contributorsrc", "utf8");
  const data = yaml.load(fileContents);
  const listOfContributors = data.contributors;
  let listOfUsersWithInvalidContributionEntries = [];

  listOfContributors.forEach(({ contributions, login }, index) => {
    if (contributions.length === 0) {
      console.log(
        `Contributor ${login} has decided not to list contributions.`
      );
    }

    let isEveryContributionEntryValid = contributions.every((contribution) =>
      listOfDefaultContributionTypes.includes(contribution)
    );

    if (!isEveryContributionEntryValid) {
      console.error(`Contributor ${login} has invalid contributions.`);
      listOfUsersWithInvalidContributionEntries.push(login);
    }
  });

  if (listOfUsersWithInvalidContributionEntries.length > 0) {
    console.error("Invalid contributions found:");
    console.error(listOfUsersWithInvalidContributionEntries);
    process.exit(1);
  } else {
    console.log("Contributions are valid.");
  }
} catch (e) {
  console.error("Error reading or parsing the all contributors file:", e);
  process.exit(1);
}
