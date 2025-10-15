// From javascript_database integration and javascript_log_in_with_replit integration
import { 
  users, articles, comments, tags, articleTags, claps, bookmarks, follows, donations,
  type User, type InsertUser, type UpsertUser, type Article, type InsertArticle, 
  type Comment, type InsertComment, type Tag, type InsertTag,
  type InsertDonation, type Donation
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, like, sql, count } from "drizzle-orm";

// Enhanced storage interface for publishing platform
export interface IStorage {
  // Users - from javascript_log_in_with_replit integration
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Additional user operations
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User>;
  
  // Articles
  getArticle(id: string): Promise<Article | undefined>;
  getArticlesByAuthor(authorId: string, limit?: number): Promise<Article[]>;
  getPublishedArticles(limit?: number, offset?: number): Promise<Article[]>;
  createArticle(article: InsertArticle & { authorId: string }): Promise<Article>;
  updateArticle(id: string, updates: Partial<InsertArticle>): Promise<Article>;
  deleteArticle(id: string): Promise<void>;
  searchArticles(query: string, limit?: number): Promise<Article[]>;
  
  // Comments
  getCommentsByArticle(articleId: string): Promise<Comment[]>;
  createComment(comment: InsertComment & { authorId: string }): Promise<Comment>;
  
  // Engagement
  clapArticle(userId: string, articleId: string): Promise<void>;
  unclapArticle(userId: string, articleId: string): Promise<void>;
  hasUserClappedArticle(userId: string, articleId: string): Promise<boolean>;
  bookmarkArticle(userId: string, articleId: string): Promise<void>;
  unbookmarkArticle(userId: string, articleId: string): Promise<void>;
  isArticleBookmarked(userId: string, articleId: string): Promise<boolean>;
  
  // Following
  followUser(followerId: string, followingId: string): Promise<void>;
  unfollowUser(followerId: string, followingId: string): Promise<void>;
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
  
  // Tags
  createTag(tag: InsertTag): Promise<Tag>;
  getOrCreateTag(name: string): Promise<Tag>;
  getPopularTags(limit?: number): Promise<Tag[]>;
  addTagToArticle(articleId: string, tagId: string): Promise<void>;
  
  // Donations
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonationStatus(id: string, status: string, stripePaymentIntentId?: string): Promise<Donation>;
}

// Database storage implementation - from javascript_database integration and javascript_log_in_with_replit integration
export class DatabaseStorage implements IStorage {
  // Users - from javascript_log_in_with_replit integration
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Additional user operations
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Articles
  async getArticle(id: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article || undefined;
  }

  async getArticlesByAuthor(authorId: string, limit = 10): Promise<Article[]> {
    return db
      .select()
      .from(articles)
      .where(eq(articles.authorId, authorId))
      .orderBy(desc(articles.createdAt))
      .limit(limit);
  }

  async getPublishedArticles(limit = 20, offset = 0): Promise<Article[]> {
    return db
      .select()
      .from(articles)
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.publishedAt))
      .limit(limit)
      .offset(offset);
  }

  async createArticle(articleData: InsertArticle & { authorId: string }): Promise<Article> {
    const [article] = await db
      .insert(articles)
      .values(articleData)
      .returning();
    return article;
  }

  async updateArticle(id: string, updates: Partial<InsertArticle>): Promise<Article> {
    const [article] = await db
      .update(articles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return article;
  }

  async deleteArticle(id: string): Promise<void> {
    await db.delete(articles).where(eq(articles.id, id));
  }

  async searchArticles(query: string, limit = 20): Promise<Article[]> {
    return db
      .select()
      .from(articles)
      .where(
        and(
          eq(articles.status, "published"),
          sql`${articles.title} ILIKE ${`%${query}%`} OR ${articles.content} ILIKE ${`%${query}%`}`
        )
      )
      .orderBy(desc(articles.publishedAt))
      .limit(limit);
  }

  // Comments
  async getCommentsByArticle(articleId: string): Promise<Comment[]> {
    return db
      .select()
      .from(comments)
      .where(eq(comments.articleId, articleId))
      .orderBy(asc(comments.createdAt));
  }

  async createComment(commentData: InsertComment & { authorId: string }): Promise<Comment> {
    const [comment] = await db
      .insert(comments)
      .values(commentData)
      .returning();
    
    // Update article comment count
    await db
      .update(articles)
      .set({ 
        commentsCount: sql`${articles.commentsCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(articles.id, commentData.articleId));
    
    return comment;
  }

  // Engagement
  async clapArticle(userId: string, articleId: string): Promise<void> {
    await db.insert(claps).values({ userId, articleId });
    await db
      .update(articles)
      .set({ 
        clapsCount: sql`${articles.clapsCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(articles.id, articleId));
  }

  async unclapArticle(userId: string, articleId: string): Promise<void> {
    await db
      .delete(claps)
      .where(and(eq(claps.userId, userId), eq(claps.articleId, articleId)));
    await db
      .update(articles)
      .set({ 
        clapsCount: sql`${articles.clapsCount} - 1`,
        updatedAt: new Date()
      })
      .where(eq(articles.id, articleId));
  }

  async hasUserClappedArticle(userId: string, articleId: string): Promise<boolean> {
    const [clap] = await db
      .select()
      .from(claps)
      .where(and(eq(claps.userId, userId), eq(claps.articleId, articleId)))
      .limit(1);
    return !!clap;
  }

  async bookmarkArticle(userId: string, articleId: string): Promise<void> {
    await db.insert(bookmarks).values({ userId, articleId });
  }

  async unbookmarkArticle(userId: string, articleId: string): Promise<void> {
    await db
      .delete(bookmarks)
      .where(and(eq(bookmarks.userId, userId), eq(bookmarks.articleId, articleId)));
  }

  async isArticleBookmarked(userId: string, articleId: string): Promise<boolean> {
    const [bookmark] = await db
      .select()
      .from(bookmarks)
      .where(and(eq(bookmarks.userId, userId), eq(bookmarks.articleId, articleId)))
      .limit(1);
    return !!bookmark;
  }

  // Following
  async followUser(followerId: string, followingId: string): Promise<void> {
    await db.insert(follows).values({ followerId, followingId });
    // Update follower counts
    await db
      .update(users)
      .set({ followingCount: sql`${users.followingCount} + 1` })
      .where(eq(users.id, followerId));
    await db
      .update(users)
      .set({ followersCount: sql`${users.followersCount} + 1` })
      .where(eq(users.id, followingId));
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    await db
      .delete(follows)
      .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
    // Update follower counts
    await db
      .update(users)
      .set({ followingCount: sql`${users.followingCount} - 1` })
      .where(eq(users.id, followerId));
    await db
      .update(users)
      .set({ followersCount: sql`${users.followersCount} - 1` })
      .where(eq(users.id, followingId));
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const [follow] = await db
      .select()
      .from(follows)
      .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)))
      .limit(1);
    return !!follow;
  }

  // Tags
  async createTag(tag: InsertTag): Promise<Tag> {
    const [newTag] = await db
      .insert(tags)
      .values(tag)
      .returning();
    return newTag;
  }

  async getOrCreateTag(name: string): Promise<Tag> {
    const [existingTag] = await db
      .select()
      .from(tags)
      .where(eq(tags.name, name))
      .limit(1);
    
    if (existingTag) {
      return existingTag;
    }
    
    return this.createTag({ name });
  }

  async getPopularTags(limit = 20): Promise<Tag[]> {
    return db
      .select()
      .from(tags)
      .orderBy(desc(tags.articlesCount))
      .limit(limit);
  }

  async addTagToArticle(articleId: string, tagId: string): Promise<void> {
    await db.insert(articleTags).values({ articleId, tagId });
    await db
      .update(tags)
      .set({ articlesCount: sql`${tags.articlesCount} + 1` })
      .where(eq(tags.id, tagId));
  }

  // Donations
  async createDonation(donation: InsertDonation): Promise<Donation> {
    const [newDonation] = await db
      .insert(donations)
      .values(donation)
      .returning();
    return newDonation;
  }

  async updateDonationStatus(id: string, status: string, stripePaymentIntentId?: string): Promise<Donation> {
    const updateData: any = { status };
    if (stripePaymentIntentId) {
      updateData.stripePaymentIntentId = stripePaymentIntentId;
    }
    
    const [donation] = await db
      .update(donations)
      .set(updateData)
      .where(eq(donations.id, id))
      .returning();
    return donation;
  }
}

export const storage = new DatabaseStorage();
