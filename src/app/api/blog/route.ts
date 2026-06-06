import { connectDB } from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');

    let query: any = { published: true };

    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };

    const posts = await BlogPost.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Validate required fields
    if (!body.title || !body.excerpt || !body.content) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = body.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    const post = await BlogPost.create({
      ...body,
      readingTime,
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ 
      success: false, 
      message: error?.message || 'Unknown error',
      details: error?.toString()
    }, { status: 500 });
  }
}
