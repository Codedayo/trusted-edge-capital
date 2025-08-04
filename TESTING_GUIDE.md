# Trusted Edge Capital - Testing Guide

## 🚀 Quick Test Instructions

### 1. **Demo Mode Testing** (Recommended)
1. Visit: `http://localhost:8082`
2. Click **"Try Demo Mode"** button
3. You'll be automatically logged in and can test all features

### 2. **Real Account Testing** (Requires Supabase Setup)
1. Visit: `http://localhost:8082`
2. Click **"Sign Up"** tab
3. Fill in your details and create account
4. Check email for verification (check spam folder)

## ✅ **What Should Work in Demo Mode**

### **Landing Page**
- ✅ Sliding quotes carousel (auto-rotates every 5 seconds)
- ✅ Manual navigation with arrows and dots
- ✅ Professional design with navy/gold theme
- ✅ All buttons functional

### **Authentication**
- ✅ Demo mode bypasses all database issues
- ✅ "Try Demo Mode" button works
- ✅ Demo user shows in dashboard
- ✅ "Demo Mode" badge appears in header

### **Dashboard**
- ✅ Portfolio overview with mock data
- ✅ Holdings display (BTC, ETH)
- ✅ Transaction history
- ✅ Market data with real-time updates
- ✅ Trading panel functional
- ✅ Crypto wallet with deposit/transfer dialogs

### **Trading Features**
- ✅ Place buy/sell orders
- ✅ Different order types (market, limit, stop-loss)
- ✅ Order history
- ✅ Real-time price updates

### **Crypto Wallet**
- ✅ View balances (BTC, ETH, USDT)
- ✅ Deposit dialog with QR codes
- ✅ Transfer dialog with address input
- ✅ Copy address functionality

### **Market Data**
- ✅ Asset listings (crypto and stocks)
- ✅ Price changes and charts
- ✅ Watchlist functionality
- ✅ Search and filtering

## 🔧 **Troubleshooting**

### **If Demo Mode Doesn't Work**
1. Clear browser cache
2. Check console for errors
3. Ensure all files are saved
4. Restart development server

### **If Real Account Doesn't Work**
1. Check Supabase configuration
2. Verify environment variables
3. Run database migrations
4. Check email settings in Supabase

### **Common Issues**

#### **"User not authenticated" errors**
- **Solution**: Use Demo Mode instead
- **Cause**: Supabase not configured

#### **"Database tables don't exist"**
- **Solution**: Use Demo Mode or set up Supabase
- **Cause**: Database migration not run

#### **Email not received**
- **Solution**: Check spam folder
- **Cause**: Email provider not configured

#### **Dialog accessibility warnings**
- **Solution**: Fixed in latest version
- **Cause**: Missing DialogDescription components

## 🎯 **Testing Checklist**

### **Landing Page**
- [ ] Quotes carousel auto-rotates
- [ ] Manual navigation works
- [ ] All buttons functional
- [ ] Professional design

### **Authentication**
- [ ] Demo mode works
- [ ] Sign up works (if Supabase configured)
- [ ] Sign in works (if Supabase configured)
- [ ] Error handling works

### **Dashboard**
- [ ] Portfolio data displays
- [ ] Holdings show correctly
- [ ] Transaction history works
- [ ] Navigation tabs work
- [ ] Demo mode indicator shows

### **Trading**
- [ ] Place orders
- [ ] View order history
- [ ] Real-time updates
- [ ] Different order types

### **Crypto Wallet**
- [ ] View balances
- [ ] Deposit dialog
- [ ] Transfer dialog
- [ ] Copy addresses

### **Market Data**
- [ ] Asset listings
- [ ] Price updates
- [ ] Watchlist
- [ ] Search/filter

## 🚀 **Performance Notes**

- **Demo Mode**: Instant loading, no database required
- **Real Mode**: Requires Supabase setup
- **Real-time Updates**: Every 5 seconds in demo mode
- **Responsive Design**: Works on all screen sizes

## 📱 **Mobile Testing**

- [ ] Responsive design
- [ ] Touch interactions
- [ ] Mobile navigation
- [ ] Dialog functionality

## 🌙 **Dark Mode Testing**

- [ ] Theme switching
- [ ] Color consistency
- [ ] Readability
- [ ] Component styling

## 🔒 **Security Testing**

- [ ] Demo mode isolation
- [ ] Real authentication (if configured)
- [ ] Data protection
- [ ] Error handling

## 📊 **Expected Results**

### **Demo Mode**
- No database errors
- All features functional
- Mock data displays correctly
- Smooth user experience

### **Real Mode** (with Supabase)
- Email verification works
- Database operations succeed
- Real-time data updates
- Persistent user data

## 🎉 **Success Indicators**

✅ **All buttons work**  
✅ **No console errors**  
✅ **Smooth animations**  
✅ **Professional appearance**  
✅ **Responsive design**  
✅ **Demo mode functional**  

## 🆘 **Need Help?**

1. Check the console for errors
2. Verify all files are saved
3. Restart the development server
4. Use Demo Mode for testing
5. Check the SETUP_GUIDE.md for configuration

---

**Happy Testing! 🚀** 