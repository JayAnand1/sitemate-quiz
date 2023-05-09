const PORT = 3000;
const express = require("express");
let issues = require("./issues");

try {
  // Initialize express
  const app = express();
  // use cors
  // app.use(cors({ origin: true }));
  // parse JSON
  app.use(express.json());
  // parse URL encoded data
  app.use(express.urlencoded({ extended: true }));
  // create a server

  app.put("/create", async (req, res) => {
    try {
      if (!Object.keys(req.body).length) {
        return res.status(400).json({
          ok: false,
          message: "Request body cannot be empty",
        });
      }
      const body = req.body;
      if (!body.issue) {
        return res.status(400).json({
          ok: false,
          message: "Issue invalid",
        });
      }
      console.log("/create issue:", body.issue);
      issues.push(body.issue);
      return res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Failed to create issue",
        error: error,
      });
    }
  });

  app.get("/read", async (req, res) => {
    try {
      const id = parseInt(req.query.id);
      if (!typeof(id) === "number") {
        return res.status(400).json({
          ok: false,
          message: "Issue ID invalid",
        });
      }
      let issue = issues.find((issue) => issue.id === id);
      if (!issue) {
        return res.status(400).json({
          ok: false,
          message: "Issue ID does not exist",
        });
      }
      console.log("/read issue:", issue);
      return res.status(200).json({ ok: true, issue });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Failed to read issue",
        error: error,
      });
    }
  });

  app.post("/update", async (req, res) => {
    try {
        if (!Object.keys(req.body).length) {
          console.log("Body is empty");
          return res.status(400).json({
            ok: false,
            message: "Request body cannot be empty",
          });
        }
        const body = req.body;
        if (!body.issue) {
          return res.status(400).json({
            ok: false,
            message: "Issue invalid",
          });
        }
        console.log("/update issue:", body.issue);
        var newIssues = issues.filter(issue => issue.id !== body.issue.id);
        newIssues.push(body.issue);
        issues = newIssues;
        return res.status(200).json({ ok: true });
      } catch (error) {
        res.status(500).json({
          ok: false,
          message: "Failed to update issue",
          error: error,
        });
      }
  });

  app.delete("/delete", async (req, res) => {
    try {
      const id = parseInt(req.query.id);
      if (!typeof(id) === "number") {
        return res.status(400).json({
          ok: false,
          message: "Issue ID invalid",
        });
      }
      let issue = issues.find((issue) => issue.id === id);
      if (!issue) {
        return res.status(400).json({
          ok: false,
          message: "Issue ID does not exist",
        });
      }
      console.log("/delete issue with id:", id);
      var newIssues = issues.filter(issue => issue.id !== id);
      issues = newIssues;
      return res.status(200).json({ ok: true, issue });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Failed to read issue",
        error: error,
      });
    }
  });
  app.listen(PORT, () => {
    console.log(`⚡️ Express running on port ${PORT}`);
  });
} catch (error) {
  console.error("Unable to start Rest API Server", error);
}
