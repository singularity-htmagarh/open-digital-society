import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - from javascript_log_in_with_replit integration
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - from javascript_log_in_with_replit integration  
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  // Additional fields for publishing platform
  username: text("username").unique(),
  bio: text("bio"),
  isWriter: boolean("is_writer").default(false),
  totalClaps: integer("total_claps").default(0),
  followersCount: integer("followers_count").default(0),
  followingCount: integer("following_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Articles table
export const articles = pgTable("articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  authorId: varchar("author_id").notNull().references(() => users.id),
  status: text("status").notNull().default("draft"), // draft, published, archived
  isOpenAccess: boolean("is_open_access").default(true),
  readTime: integer("read_time"), // in minutes
  clapsCount: integer("claps_count").default(0),
  commentsCount: integer("comments_count").default(0),
  viewsCount: integer("views_count").default(0),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tags table
export const tags = pgTable("tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description"),
  articlesCount: integer("articles_count").default(0),
  followersCount: integer("followers_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Article tags junction table
export const articleTags = pgTable("article_tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  articleId: varchar("article_id").notNull().references(() => articles.id),
  tagId: varchar("tag_id").notNull().references(() => tags.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Comments table
export const comments = pgTable("comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  authorId: varchar("author_id").notNull().references(() => users.id),
  articleId: varchar("article_id").notNull().references(() => articles.id),
  parentId: varchar("parent_id").references(() => comments.id), // for replies
  clapsCount: integer("claps_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Claps table (for articles and comments)
export const claps = pgTable("claps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  articleId: varchar("article_id").references(() => articles.id),
  commentId: varchar("comment_id").references(() => comments.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Bookmarks table
export const bookmarks = pgTable("bookmarks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  articleId: varchar("article_id").notNull().references(() => articles.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Follows table (user following other users)
export const follows = pgTable("follows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  followerId: varchar("follower_id").notNull().references(() => users.id),
  followingId: varchar("following_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Donations table
export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  amount: integer("amount").notNull(), // in cents
  currency: text("currency").notNull().default("usd"),
  donorEmail: text("donor_email"),
  donorName: text("donor_name"),
  message: text("message"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations - from javascript_database integration
export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
  comments: many(comments),
  claps: many(claps),
  bookmarks: many(bookmarks),
  followers: many(follows, { relationName: "UserFollowers" }),
  following: many(follows, { relationName: "UserFollowing" }),
}));

export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
  tags: many(articleTags),
  comments: many(comments),
  claps: many(claps),
  bookmarks: many(bookmarks),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  articles: many(articleTags),
}));

export const articleTagsRelations = relations(articleTags, ({ one }) => ({
  article: one(articles, {
    fields: [articleTags.articleId],
    references: [articles.id],
  }),
  tag: one(tags, {
    fields: [articleTags.tagId],
    references: [tags.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  article: one(articles, {
    fields: [comments.articleId],
    references: [articles.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: "CommentReplies",
  }),
  replies: many(comments, { relationName: "CommentReplies" }),
  claps: many(claps),
}));

export const clapsRelations = relations(claps, ({ one }) => ({
  user: one(users, {
    fields: [claps.userId],
    references: [users.id],
  }),
  article: one(articles, {
    fields: [claps.articleId],
    references: [articles.id],
  }),
  comment: one(comments, {
    fields: [claps.commentId],
    references: [comments.id],
  }),
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
  article: one(articles, {
    fields: [bookmarks.articleId],
    references: [articles.id],
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
    relationName: "UserFollowers",
  }),
  following: one(users, {
    fields: [follows.followingId],
    references: [users.id],
    relationName: "UserFollowing",
  }),
}));

// Insert schemas - from javascript_log_in_with_replit integration
export const upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  firstName: true,
  lastName: true,
  bio: true,
  profileImageUrl: true,
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  subtitle: true,
  content: true,
  excerpt: true,
  featuredImage: true,
  isOpenAccess: true,
  readTime: true,
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  content: true,
  articleId: true,
  parentId: true,
});

export const insertTagSchema = createInsertSchema(tags).pick({
  name: true,
  description: true,
});

export const insertDonationSchema = createInsertSchema(donations).pick({
  amount: true,
  currency: true,
  donorEmail: true,
  donorName: true,
  message: true,
});

// Types - from javascript_log_in_with_replit integration
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;
export type InsertTag = z.infer<typeof insertTagSchema>;
export type Tag = typeof tags.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;
