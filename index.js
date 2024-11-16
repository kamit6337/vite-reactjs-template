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

function copyTemplate(destFolder) {
  const templatePath = path.join(__dirname, "template-reactjs-rest-api");

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

  copyTemplate(projectPath);
  installDependencies(projectPath);

  console.log("React JS app created successfully!");
}

main();
