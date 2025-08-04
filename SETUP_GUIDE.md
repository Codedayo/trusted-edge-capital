# Trusted Edge Capital - Setup Guide

## 🚀 Quick Start

### 1. Supabase Setup

The application requires a Supabase database with the correct schema. Follow these steps:

#### Option A: Use Supabase Cloud (Recommended)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Set Environment Variables**
   Create a `.env.local` file in the project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run Database Migration**
   - Install Supabase CLI: `npm install -g supabase`
   - Login: `supabase login`
   - Link your project: `supabase link --project-ref your_project_ref`
   - Run migration: `supabase db push`

#### Option B: Use Local Development (Alternative)

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Start Local Supabase**
   ```bash
   supabase start
   ```

3. **Run Migration**
   ```bash
   supabase db reset
   ```

### 2. Email Configuration

For email verification to work:

1. **Configure Email Provider in Supabase**
   - Go to Authentication > Settings
   - Configure SMTP settings or use Supabase's built-in email service

2. **Test Email Setup**
   - Try registering a new user
   - Check if verification emails are sent

### 3. Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Troubleshooting

### Authentication Issues

If you see errors like:
- `"Could not find the 'email' column of 'profiles'"`
- `"Could not find the 'is_default' column of 'portfolios'"`

**Solution**: The database schema hasn't been applied. Run:
```bash
supabase db reset
```

### Email Not Received

**Solutions**:
1. Check spam folder
2. Verify email configuration in Supabase dashboard
3. Use a real email address (not disposable)

### Database Connection Issues

**Solutions**:
1. Verify environment variables are correct
2. Check Supabase project is active
3. Ensure RLS policies are enabled

## 📁 Project Structure

```
trusted-edge-trade/
├── src/
│   ├── components/     # UI components
│   ├── contexts/       # React contexts
│   ├── integrations/   # External integrations
│   ├── lib/           # Utilities and API
│   └── pages/         # Page components
├── supabase/
│   └── migrations/    # Database migrations
└── public/            # Static assets
```

## 🎯 Features

- ✅ Professional trading platform UI
- ✅ User authentication with Supabase
- ✅ Portfolio management
- ✅ Real-time market data
- ✅ Crypto and stock trading
- ✅ Responsive design
- ✅ Dark/light mode

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Connect to Vercel

2. **Set Environment Variables**
   - Add Supabase URL and key in Vercel dashboard

3. **Deploy**
   - Vercel will automatically deploy on push

### Other Platforms

The app can be deployed to any static hosting platform:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📞 Support

If you encounter issues:

1. Check the console for error messages
2. Verify Supabase configuration
3. Ensure all environment variables are set
4. Check database migration status

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for Supabase
- Enable 2FA for production
- Regularly update dependencies 