import mongoose, { Schema, Document } from 'mongoose';

interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: 'guide' | 'location' | 'faq' | 'comparison' | 'review';
  tags: string[];
  image?: string;
  readingTime: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'PG Near Team' },
    category: {
      type: String,
      enum: ['guide', 'location', 'faq', 'comparison', 'review'],
      default: 'guide',
    },
    tags: [String],
    image: { type: String },
    readingTime: { type: Number, default: 5 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Auto-generate slug from title
BlogPostSchema.pre('save', async function (this: any) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
