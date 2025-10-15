// From javascript_log_in_with_replit integration
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertArticleSchema, insertCommentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Replit authentication removed

  // Article routes
  app.get('/api/articles', async (req, res) => {
    try {
      const { limit = 20, offset = 0 } = req.query;
      const articles = await storage.getPublishedArticles(
        parseInt(limit as string), 
        parseInt(offset as string)
      );
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get('/api/articles/:id', async (req, res) => {
    try {
      const article = await storage.getArticle(req.params.id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.post('/api/articles', async (req: any, res) => {
    // Authentication removed
    res.status(501).json({ message: "Authentication required. Replit auth removed." });
  });

  // Search routes
  app.get('/api/search', async (req, res) => {
    try {
      const { q, limit = 20 } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query required" });
      }
      
      const articles = await storage.searchArticles(q, parseInt(limit as string));
      res.json({ articles });
    } catch (error) {
      console.error("Error searching:", error);
      res.status(500).json({ message: "Failed to search" });
    }
  });

  // Engagement routes
  app.post('/api/articles/:id/clap', async (req: any, res) => {
    // Authentication removed
    res.status(501).json({ message: "Authentication required. Replit auth removed." });
  });

  app.post('/api/articles/:id/comments', async (req: any, res) => {
    // Authentication removed
    res.status(501).json({ message: "Authentication required. Replit auth removed." });
  });

  app.get('/api/articles/:id/comments', async (req, res) => {
    try {
      const comments = await storage.getCommentsByArticle(req.params.id);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
