#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const GITIGNORE = require("./gitignore");

function createGitignore(destFolder) {
  const gitignorePath = path.join(destFolder, ".gitignore");

  // Gitignore entries you want to include
  const gitignoreContent = GITIGNORE;

  // Write the .gitignore content to the file
  fs.writeFileSync(gitignorePath, gitignoreContent.trim());
  console.log(".gitignore created successfully.");
}

function copyTemplate(destFolder, isIncludeSocketIo) {
  let pathFile = "template-reactjs-rest-api";

  if (isIncludeSocketIo) {
    pathFile = "template-reactjs-rest-api-socketio";
  }

  const templatePath = path.join(__dirname, pathFile);

  try {
    fs.cpSync(templatePath, destFolder, { recursive: true });
    console.log("Template files copied successfully.");
  } catch (err) {
    console.error("Error copying template files:", err.message);
    process.exit(1);
  }

  // Create .gitignore in the new project
  createGitignore(destFolder);
}

function installDependencies(destFolder) {
  console.log("Installing dependencies...");

  try {
    // Run npm install
    execSync("npm install", { cwd: destFolder, stdio: "inherit" });
    console.log("Dependencies installed successfully.");
  } catch (err) {
    console.error("Error installing dependencies:", err.message);
    process.exit(1);
  }
}

async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function main() {
  const projectName = process.argv[2] || "my-reactjs-app";
  const isCurrentDir = projectName === ".";
  const projectPath = isCurrentDir
    ? process.cwd()
    : path.resolve(process.cwd(), projectName);

  if (!isCurrentDir && fs.existsSync(projectPath)) {
    console.log(`Error: Directory ${projectName} already exists.`);
    process.exit(1);
  }

  if (!isCurrentDir) {
    fs.mkdirSync(projectPath);
  }

  // Ask the user for API type preference
  const answer = await askQuestion(
    "Would like to include Socket.IO? (yes or no, default is no): "
  );

  let isIncludeSocketIo = false;

  if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
    isIncludeSocketIo = true;
  } else {
    isIncludeSocketIo = false;
  }

  // Copy template files to root project directory
  copyTemplate(projectPath, isIncludeSocketIo);

  installDependencies(projectPath);

  console.log("React JS app created successfully!");
}

main();
