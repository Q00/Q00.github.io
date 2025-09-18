import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

export function rssPlugin() {
  return {
    name: "vite-rss-plugin",
    apply: "build",
    async closeBundle() {
      try {
        console.log("🔄 Generating RSS and Atom feeds...");

        // Import dynamically to avoid module resolution issues
        const { createContentProvider, generateRSSFeed, generateAtomFeed } =
          await import("@q00-blog/shared");

        const contentProvider = createContentProvider();
        const posts = await contentProvider.getPosts(50);

        if (posts.length === 0) {
          console.warn("️No posts found, generating empty feeds");
        } else {
          console.log(`Found ${posts.length} posts for feeds`);
        }

        // Generate RSS and Atom feeds
        const rssXml = generateRSSFeed(posts);
        const atomXml = generateAtomFeed(posts);

        // Ensure dist directory exists
        const distPath = "dist";
        mkdirSync(distPath, { recursive: true });

        // Write feeds to dist directory
        writeFileSync(join(distPath, "rss.xml"), rssXml, "utf8");
        writeFileSync(join(distPath, "feed.xml"), rssXml, "utf8"); // Alternative path
        writeFileSync(join(distPath, "atom.xml"), atomXml, "utf8");

        console.log("RSS and Atom feeds generated successfully");
        console.log("   - /rss.xml");
        console.log("   - /feed.xml");
        console.log("   - /atom.xml");
      } catch (error) {
        console.error("❌ Failed to generate feeds:", error);
        console.warn("📝 Using fallback RSS generation...");

        // Fallback simple RSS generation
        const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[When Pressure Turns into Inspiration]]></title>
    <link>https://q00.hashnode.dev</link>
    <description><![CDATA[When Pressure Turns into Inspiration]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://q00.hashnode.dev/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>Q00 Blog RSS Generator</generator>
    <webMaster>jqyu.lee@gmail.com (JQ)</webMaster>
    <managingEditor>jqyu.lee@gmail.com (JQ)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} JQ</copyright>
    <ttl>60</ttl>
  </channel>
</rss>`;

        const distPath = "dist";
        mkdirSync(distPath, { recursive: true });
        writeFileSync(join(distPath, "rss.xml"), fallbackRss, "utf8");
        writeFileSync(join(distPath, "feed.xml"), fallbackRss, "utf8");

        console.log("Fallback RSS feeds generated");
      }
    },
  };
}
