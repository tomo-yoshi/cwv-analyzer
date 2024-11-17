import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const mockData = `### Summary of the Data

**Mobile Metrics Overview:**

1. **Performance Score:** Consistently high scores (mostly 1) except for a few metrics with low scores indicating issues.

2. **Time to Interactive:** Varied significantly across analyses, reaching as high as **22.0 seconds** in the worst case and improvements to **14.8 seconds** in better cases.

3. **Largest Contentful Paint (LCP):** Also varied, with the worst case being **8.3 seconds** and better cases around **2.7 seconds**.

4. **Speed Index:** Generally ranged from **4.2 to 5.6 seconds**, indicating a moderate speed of content loading.

5. **Total Blocking Time (TBT):** Varied with high values up to **13 seconds**, showcasing potential delays during the loading process.

6. **Excessive DOM Size:** Consistently flagged with **1,201 elements**, indicating a potential for optimizations in restructuring the HTML.

**Desktop Metrics Overview:**

1. **Performance Score:** Also consistently rated at 1, indicating largely healthy metrics overall.

2. **Time to Interactive:** Times range from **2.3 seconds** to **4.4 seconds**, which are generally acceptable for desktop.

3. **LCP:** This metric shows better performance for desktop compared to mobile, ranging from approximately **1.1 seconds** to **2.1 seconds**.

4. **First Contentful Paint (FCP):** This metric shows excellent performance, typically around **0.4 seconds**.

5. **Network RTT:** Consistently around **30 - 40 ms**, indicating reasonably low latency.

6. **Total Byte Weight:** Varies between **1,472 KiB** to **1,479 KiB**, suggesting large asset sizes might be an issue.

### Key Metrics with Issues & Potential Solutions

1. **Time to Interactive (TTI)**

- **Concern:** High values seen particularly on mobile (up to 22.0 seconds).

- **Solutions:**

- Minimize JavaScript execution by reducing the amount of JS loaded initially.

- Use code splitting to load only necessary JS for the initial view.

- Optimize long-blocking tasks and try to use Web Workers for intensive operations.

2. **Largest Contentful Paint (LCP)**

- **Concern:** Instances as high as 8.3 seconds for mobile.

- **Solutions:**

- Optimize images (reduce their size and load times) and consider using modern formats (like WebP).

- Preload key image resources with <link rel="preload"> tags where applicable.

- Improve server response times to help earlier loading of key resources.

3. **Total Blocking Time (TBT)**

- **Concern:** High TBT values indicate multiple periods of lag before interactivity.

- **Solutions:**

- Reduce the workload on the main thread by offloading non-essential tasks.

- Consider breaking up long tasks into smaller asynchronous operations.

- Optimize and defer third-party scripts.

4. **Speed Index**

- **Concern:** Generally hovering around the 4-5 seconds mark on mobile, indicating slower content loading.

- **Solutions:**

- Optimize the critical rendering path by refactoring CSS and JavaScript.

- Reduce render-blocking resources and inline critical CSS.

5. **Excessive DOM Size**

- **Concern:** Repeated issues with a DOM size of 1,201 elements.

- **Solutions:**

- Simplify the structure of the HTML, breaking up components to reduce complexity.

- Use lazy loading techniques for non-critical content to prevent loading everything upfront.

By implementing these solutions, there is significant potential to enhance the performance of both mobile and desktop platforms, ultimately improving user experience and engagement.`

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a web performance expert analyzing PageSpeed metrics."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    return NextResponse.json({ analysis: completion.choices[0].message.content });
    // return NextResponse.json({ analysis: mockData });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to analyze' }, { status: 500 });
  }
}