interface Config {
  baseURL?: string;
  nodeEnv: "development" | "production" | "test";
  clientUrl: string;
  serviceName: string;
  description: string;
  warningDescription: string;
  departmentDescription: string;
  softwareDepartment: string;
  embeddedDepartment: string;
  schoolSong: string;
  privacyPolicy: string;
}

const createConfig: () => Config = () => {
  if (!process.env.NODE_ENV) throw new Error("no node env");

  return {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    nodeEnv: process.env.NODE_ENV,
    clientUrl: typeof window !== "undefined" ? window.location.origin : "",
    serviceName: "?엥엥ㅇ/엥?ㅔ엥엥?ㅔㅇ엥ㅇ엥?ㅇ엥?",
    description: `Beyond Prepared
Haul everything you need with 2,500 pounds payload and 11,000 pounds towing capacity—the equivalent of an average African elephant. The super-tough composite bed doesn’t need a liner and is big enough for 4'x8’ construction materials.`,
    warningDescription: `Make low-speed maneuvers with only minor steering inputs. At higher speeds, your maneuvers will be more predictable and quicker.
`,
    departmentDescription: `I was still a Software Engineer.

It all started with a code review.

I’d spent days working on a complex feature. Hundreds of lines of code, edge cases covered, performance tweaks in place. I was proud of it. I hit “Create Pull Request” and waited for feedback, expecting maybe a comment or two.

What I got back was brutal.

“Over-engineered. Too many moving parts. Refactor.”

That was it. No “nice work.” No “good attempt”. Just a hard stop.

I sat there, fuming. I thought, “Does this guy enjoy tearing people down?”

But this was just the beginning.

The manager who didn’t care about my feelings
He wasn’t like other leads I’d worked with.

No hand-holding. No fluff.

He rejected half-baked ideas without blinking.

He hated complexity for the sake of cleverness.

He cared about one thing: clean, maintainable, efficient code.

In sprint retros, he didn’t sugarcoat things. Missed a deadline? He’d say, “We scoped it wrong. Let’s fix it.” Built something that didn’t scale? “That’s tech debt. We can’t afford it.”

At first, I thought he was just that manager. The one who made engineers miserable. But there was something deeper going on.

If you enjoy posts like this, consider supporting my work and subscribing to this newsletter.

As a free subscriber, you get:

✉️ 1 post per week

🧑‍🎓 Access to the Engineering Manager Masterclass

As a paid subscriber, you get:

🔒 50+ templates and playbooks (worth $79)

🔒 A weekly "What would you do?" scenario & breakdown from real challenges EMs face

🔒 Full access to the complete archive

Join the best engineering leaders for weekly articles on creating high-performing teams!

Type your email...
Subscribe
The ego check that changed everything
The tipping point came during a sprint review.

I demoed a feature I was sure would impress him. Instead, he cut me off halfway through.

“This is fragile. What happens under load? What’s the rollback plan?”

I scrambled for answers but didn’t have good ones. He paused and then said, “You’re thinking like a coder, not an engineer. Build things that survive failure.”

That was a tough moment for me.

I spent the whole night replaying that comment. At first, I was pissed. But the more I thought about it, the more I realized he was right. I was too focused on clever solutions, not resilient ones.

The real lesson: it wasn’t about me
I started approaching my work differently.

I stopped writing “smart” code and started writing readable code.

I designed for failure scenarios, not just ideal cases.

I stopped coding for myself and started coding for the next person who’d touch my codebase.

And something wild happened:

My pull requests started flying through reviews that he would do.

It wasn’t that he’d softened. I’d just finally levelled up.

How it shaped my own leadership style
When I eventually became an engineering manager, I thought a lot about that experience.

I didn’t want to be the kind of leader people hated. But I didn’t want to be soft, either.

So I stole the parts that worked:

Brutal honesty backed by context. Instead of “This sucks,” I say, “This creates hidden tech debt, here’s why.”

Focus on system thinking. I push engineers to look past their tickets and think about how their code fits into the bigger picture.

High standards, but human feedback. I don’t just point out flaws, I help map the way forward.

I find that engineers want to be challenged, but not feel belittled in the process`,
    softwareDepartment: `How to Write Blog Posts that Developers Read
by Michael Lynch, published March 27, 2025

I recently spoke to a developer who tried blogging but gave up because nobody was reading his posts. I checked out his blog, and it was immediately obvious why he didn’t have any readers.

The developer had interesting insights, but he made so many mistakes in presenting his ideas that he was driving everyone away. The tragedy was that these errors were easy to fix. Once you learn to recognize them, they feel obvious, but some bloggers make these mistakes for years.

I know because I’m one of them.

I’ve been blogging about software development for nine years. My best posts have reached 300k+ readers, but many of them flopped, especially in my first few years.

Over time, I’ve learned techniques that help some blog posts succeed and the pitfalls that cause others to languish in obscurity.

Why listen to me?
Get to the point
Think one degree bigger
Plan the route to your readers
Show more pictures
Accommodate skimmers
Why listen to me?🔗
I’m going to say a bunch of gloaty things to establish credibility, but it feels gross, so let’s just get it out of the way:

I’ve written a software blog for nine years, and it attracts 300k-500k unique readers per year.
My posts have reached the front page of Hacker News over 30 times, many of them reaching the #1 spot.
According to a ranking system I made up, I have the 48th most popular personal blog on Hacker News.
I launched a successful indie business by writing a popular blog post about my product.
My articles frequently appear on reddit and Lobsters.

My software blog receives 300k-500k unique readers per year.

I don’t claim to be the world’s best software blogger, but I’ve had enough success and experience to share some useful lessons.

Get to the point🔗
The biggest mistake software bloggers make is meandering.

Often, the author has some valuable insight to share, but they squander their first seven paragraphs on the history of functional programming and a trip they took to Bell Labs in 1973. By the time they get to the part that’s actually interesting, everyone has long since closed the browser tab.


Internet attention spans are short. If you dawdle before making your point, the reader will seek out one of the literally billions of other articles they could be reading instead.

So, how do you convince the reader to stay and continue reading your blog post?

When the reader arrives, they’re trying to answer two questions as quickly as possible:

Did the author write this article for someone like me?
How will I benefit from reading it?
Give yourself the title plus your first three sentences to answer both questions. If you find yourself in paragraph two and you haven’t answered either question, you’re in trouble.

To show the reader you’re writing for them, mention topics they care about, and use terminology they recognize. If you throw out jargon or unfamiliar concepts, the reader assumes the article isn’t meant for them and clicks away.

Your introduction should also make it clear to the reader how the article will benefit them. There are many possible benefits you can offer:

A technique the reader can apply in their work or personal life.
A clear explanation of a concept that impacts the reader’s work or personal life.
An insight that gives the reader a better understanding of a particular technology or industry.
An interesting story that resonates with the reader.

Example: “if got, want: A Simple Way to Write Better Go Tests”🔗
I recently wrote an article about improving tests when using the Go programming language.

Here’s the title and first paragraph:

if got, want: A Simple Way to Write Better Go Tests

There’s an excellent Go testing pattern that too few people know. I can teach it to you in 30 seconds.

This article immediately answers the two questions:

Did the author write the article for someone like me?
The article is for Go developers.
What’s the benefit of reading it?
You’ll learn a new testing technique in 30 seconds.
Think one degree bigger🔗
When you write an article, you hopefully have a type of reader in mind. For example, if you wrote an article called “Debugging Memory Leaks in Java,” you probably assumed that the reader is an intermediate to advanced Java developer.

Most software bloggers never think to ask, “Is there a wider audience for this topic?”

For example, “intermediate to advanced Java developers” are a subset of “Java developers,” who are a subset of “programmers,” who are a subset of “people who read blog posts.”

Categories and subcategories

If you wrote an article for intermediate and advanced Java developers, how much would have to change for the article to appeal to Java developers of any experience level?

Often, the change is just an extra sentence or two early in the article to introduce a concept or replace jargon with more accessible terms.

Jeff: Sony has a futuristic sci-fi movie they’re looking to make.

Nick: Cigarettes in space?

Jeff: It’s the final frontier, Nick.

Nick: But wouldn’t they blow up in an all-oxygen environment?

Jeff: Probably. But it’s an easy fix. One line of dialogue. “Thank God we invented the… you know, whatever device.”

Thank You for Smoking (2005)

The set of all Java developers is about 10x larger than the set of intermediate and advanced Java developers. That means small tweaks can expand the reach of your article by an order of magnitude.

Obviously, you can’t broaden every article, and you can’t keep broadening your audience forever. No matter how well you explain background concepts, your tax accountant will never read an article about memory leaks in Java. The point isn’t to write articles that appeal to every possible reader but to notice opportunities to reach a larger audience.

Example: “How I Stole Your Siacoin”🔗
One of my earliest successes in blogging was an article called “How I Stole Your Siacoin.” It was about a time I stole a reddit user’s cryptocurrency (for noble reasons, I promise).

Initially, I thought the story would resonate with the few hundred people who followed a niche cryptocurrency called Siacoin. As I was editing the article, I realized that you didn’t have to know anything about Siacoin to understand my story. I revised it slightly so it would make sense to cryptocurrency enthusiasts who had never heard of Siacoin.

Then, I realized I could even explain this story to people who knew nothing about cryptocurrency. I adjusted the terminology to use regular-person terms like “wallet” and “passphrase” and avoided crypto-specific terms like “blockchain” or “Merkle tree.”

The article was my first ever hit. It became the most popular story of all time not only on the /r/siacoin subreddit but also on the larger /r/cryptocurrency subreddit. It reached the front page of Hacker News, even though readers there are generally hostile to cryptocurrency-focused stories.

Siacoin subcategories

“How I Stole Your Siacoin” only needed a few tweaks to be enjoyable for people who didn’t know anything about cryptocurrency.

Plan the route to your readers🔗
Suppose you wrote the greatest beginner’s tutorial imaginable for the Python programming language. Both your five-year-old nephew and 80-year-old dentist blazed through it with ease and delight. Everyone who reads your tutorial goes on to become a Python core contributor.

Bad news: nobody will ever read your Python tutorial.

“Lies!” you shout. “Thousands of developers learn Python every year. Why wouldn’t my objectively awesome tutorial become popular?”

Well, think it through. What happens after you hit publish? How does anyone find your article?

You’re probably thinking: Google.

Yes, your friend Google will index your tutorial and use its secret Google magic to identify your article’s superior quality. Before you know it, your tutorial will be the top result for python tutorial.

Except that can’t happen because there are so many Python tutorials out there already on sites that Google prefers over yours. You’ll never even make it to the first page of results.


It’s nearly impossible for a new blog post to rank well in Google for the search term python tutorial.

Okay, so you’ll submit your Python tutorial to reddit. The /r/python subreddit has over 1.3 million subscribers. If even 5% of them read your article, that’s a huge audience:


The /r/python subreddit has over 1.3 million subscribers.

Whoops! /r/python only accepts text posts, not external links, so you can’t post your tutorial there.


The /r/python subreddit disables the option to submit external links.

Fine, then you’ll submit it to Hacker News. They accept anything and let their members decide what’s interesting. Surely, they’ll recognize the quality of your work!

Nope, it will flop there, too. Hacker News doesn’t like tutorials, especially for mainstream technologies like Python.

You can try sharing your tutorial by tweeting it, skeeting it, or tooting it, but unless you already have a massive following on social media, that won’t reach a critical mass either.

So, what’s the answer? How do you get people to read your amazing Python tutorial?

The answer is that you don’t write a beginner’s Python tutorial.

You need a realistic path to your readers🔗
If you want people to read your blog, choose topics that have a clear path to your readers. Before you begin writing, think through how readers will find your post.

Questions to ask when considering an article topic

Is it realistic for readers to find you via Google search?
Are there already 500 articles about the same topic from more established websites?
What keywords would your target reader search? Try searching those keywords, and see whether there are already relevant results from well-known domains.
If you’re going to submit it to a link aggregator like Hacker News or Lobsters, how often do posts like yours succeed there?
If you’re going to share it on a subreddit or niche forum, does it have any chance there?
Does the forum accept links to blog posts?
The bigger the community, the stricter the rules tend to be about external links and self-promotion.
Do blog posts like yours ever succeed there?
Is the community still active?
The best plan is to give your post multiple chances to succeed. If you’re betting everything on Google bubbling your post to the top, it could take months or years for you to find out if you succeeded. If you’re relying on Hacker News or reddit to tell you whether your article is worth reading, they’re going to break your heart a lot.

Example: “Using Zig to Unit Test a C Application”🔗
In 2023, I wrote an article called “Using Zig to Unit Test a C Application.” It was about using a new low-level language called Zig to write tests for legacy C code.

Before I wrote the article, I knew that there were several places where I could share it. By luck, they all worked out:

Hacker News is extremely friendly to Zig content, so my article reached the #7 spot on the front page.
Lobsters is extremely friendly to Zig content, so my article was one of the top links of the day.
Google bubbled my article to the top result for the keywords zig unit testing c.
It’s actually even a top result for just zig unit testing because there aren’t many articles about the topic.
The /r/Zig subreddit accepts links to blog posts, even if they’re self-promotion, so my post reached the top spot in that subreddit.
Ziggit is a niche forum that’s welcoming to Zig-related articles, so my post received 1,000 views from Ziggit.
Show more pictures🔗
The biggest bang-for-your-buck change you can make to a blog post is adding pictures.

If your article features long stretches of text, think about whether there’s any photo, screenshot, graph, or diagram that could make the post more visually interesting.

If you’re talking about a program with a graphical interface, show screenshots.
If you’re talking about an improvement in metrics like app performance or active users, show graphs.
If you’re writing about your server getting overloaded, show a screenshot of what that looked like in your dashboard or email alerts.
If you’re explaining a difficult concept, draw a diagram.
I hire illustrators for most of my posts (including this one). I typically pay $50-100 per illustration. For simple diagrams like the nested circle sketches above, I use Excalidraw, which is free and open-source.

You can also use free stock photos and AI-generated images, as they’re better than nothing, but they’re worse than anything else, including terrible MS Paint drawings.


Even a terrible MS Paint drawing is more interesting than an AI-generated image.

Accommodate skimmers🔗
Many readers skim an article first to decide if it’s worth reading. Dazzle those readers during the skim.

If the reader only saw your headings and images, would it pique their interest?

The worst thing for a skimmer to see is a wall of text: long paragraphs with no images or headings to break them up. Just text, text, text all the way down.

Tool: Read like a skimmer🔗
Here’s a JavaScript bookmarklet that you can use to see what your article looks like with just headings and images.

Skimmify page
Drag the link to your browser bookmark bar, and then click it to see what your article looks like to skimmers.

Example: Boring structure vs. interesting structure🔗
I wrote my article, “End-to-End Testing Web Apps: The Painless Way,” in 2019, before I thought about structure.

If you skim the article, does it make you want to read the full version?

Probably not. The headings don’t reveal much about the content, and the visuals are confusing.

Consider my more recent article, “I Regret My $46k Website Redesign.”

If you skim that article, you still see the bones of a good story, and there are interesting visual elements to draw the reader in.

One of those articles barely attracted any readers, and the other became one of the most popular articles I ever published, attracting 150k unique readers in its first week. Can you guess which is which?
`,
    embeddedDepartment: `Next-Generation Adaptive Suspension
Delivers up to 12″ of travel with dedicated drive modes for on-road and off-road surfaces. Adapts ride height and suspension tuning to match the driving surface and your driving style.
Heated and Cooled Seats
Enjoy ventilated front seats and heated seats in both the front and rear. You can adjust seat and cabin heating or cooling from your touchscreen or your Tesla app.
Clean Cabin Air
Breathe clean air with every climate setting. The HEPA filter can remove up to 99.97% of fine particulate matter and gaseous pollutants, as well as bacteria, viruses, pollen and mold spores.
`,
    schoolSong: `자이언츠 나승엽 쌔리라 안타 안타

자이언츠 나승엽 오오오오오`,
    privacyPolicy: `Custom Cabin Lighting
Immerse yourself in an otherworldly experience with wrap-around ambient lighting—customizable in endless color options.`,
  };
};

export default createConfig();
