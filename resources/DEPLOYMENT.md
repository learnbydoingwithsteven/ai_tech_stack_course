# Deployment Guide

Complete guide for deploying the AI Technology Stack Course to various platforms.

## 📋 Deployment Options

1. [Local Development](#local-development)
2. [Docker](#docker-deployment)
3. [Heroku](#heroku-deployment)
4. [AWS](#aws-deployment)
5. [Digital Ocean](#digital-ocean)
6. [GitHub Pages + Backend](#github-pages--backend)

---

## Local Development

Perfect for testing and development.

### Windows

```batch
# Double-click to run
START_HERE.bat
```

Or manually:
```batch
# Terminal 1 - Backend
cd app\backend
run.bat

# Terminal 2 - Frontend
cd app\frontend
serve.bat
```

### macOS/Linux

```bash
# Terminal 1 - Backend
cd app/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

# Terminal 2 - Frontend
cd app/frontend
python3 -m http.server 8080
```

Access: http://localhost:8080

---

## Docker Deployment

Best for consistent environments and easy deployment.

### Prerequisites
- Docker installed
- Docker Compose installed

### Build and Run

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Access
- Frontend: http://localhost:8080
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

### Production Configuration

For production, update `docker-compose.yml`:

```yaml
environment:
  - FLASK_ENV=production
  - SECRET_KEY=your_secret_key_here
```

---

## Heroku Deployment

Free tier available, great for demos.

### Prerequisites
- Heroku account
- Heroku CLI installed

### Backend Deployment

1. **Create Heroku app**
```bash
cd app/backend
heroku create ai-stack-backend
```

2. **Add Procfile**
```
web: python app.py
```

3. **Update app.py for Heroku**
```python
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
```

4. **Deploy**
```bash
git add .
git commit -m "Prepare for Heroku"
git push heroku main
```

5. **Open app**
```bash
heroku open
```

### Frontend Deployment

**Option 1: Heroku Static Buildpack**
```bash
cd app/frontend
heroku create ai-stack-frontend
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static
echo '{}' > static.json
git push heroku main
```

**Option 2: Use Netlify/Vercel** (Recommended for frontend)

---

## AWS Deployment

Enterprise-grade, scalable solution.

### Architecture
- **Backend**: AWS Elastic Beanstalk or Lambda
- **Frontend**: S3 + CloudFront
- **Database**: RDS (if needed)

### Backend (Elastic Beanstalk)

1. **Install EB CLI**
```bash
pip install awsebcli
```

2. **Initialize**
```bash
cd app/backend
eb init -p python-3.9 ai-stack-backend
```

3. **Create environment**
```bash
eb create ai-stack-env
```

4. **Deploy**
```bash
eb deploy
```

5. **Open**
```bash
eb open
```

### Frontend (S3 + CloudFront)

1. **Create S3 bucket**
```bash
aws s3 mb s3://ai-stack-course-frontend
```

2. **Configure static hosting**
```bash
aws s3 website s3://ai-stack-course-frontend \
  --index-document index.html
```

3. **Upload files**
```bash
cd app/frontend
aws s3 sync . s3://ai-stack-course-frontend
```

4. **Set public read policy**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::ai-stack-course-frontend/*"
  }]
}
```

5. **Create CloudFront distribution** (optional, for HTTPS)

---

## Digital Ocean

Affordable and developer-friendly.

### App Platform (Recommended)

1. **Connect GitHub repo**
2. **Configure app**:
   - Backend: Python app, Dockerfile
   - Frontend: Static site
3. **Deploy** (automatic on git push)

### Droplet (Manual)

1. **Create Ubuntu droplet**

2. **SSH and setup**
```bash
ssh root@your_droplet_ip

# Update system
apt update && apt upgrade -y

# Install Python
apt install python3 python3-pip python3-venv nginx -y

# Clone repo
git clone https://github.com/yourusername/ai-stack-course.git
cd ai-stack-course

# Setup backend
cd app/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

3. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /root/ai-stack-course/app/frontend;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

4. **Setup systemd service**
```ini
[Unit]
Description=AI Stack Backend
After=network.target

[Service]
User=root
WorkingDirectory=/root/ai-stack-course/app/backend
Environment="PATH=/root/ai-stack-course/app/backend/venv/bin"
ExecStart=/root/ai-stack-course/app/backend/venv/bin/gunicorn -w 4 -b 0.0.0.0:5000 app:app

[Install]
WantedBy=multi-user.target
```

---

## GitHub Pages + Backend

Free hosting for frontend, backend elsewhere.

### Frontend on GitHub Pages

1. **Create gh-pages branch**
```bash
cd app/frontend
git checkout -b gh-pages
git push origin gh-pages
```

2. **Enable GitHub Pages**
- Go to repo settings
- Pages section
- Select gh-pages branch
- Save

3. **Update API_URL in app.js**
```javascript
const API_URL = 'https://your-backend-url.com/api';
```

### Backend Options
- Heroku (free tier)
- Railway
- Render
- AWS Lambda
- Google Cloud Run

---

## Environment Variables

### Backend (.env)
```bash
FLASK_ENV=production
SECRET_KEY=your_secret_key_here
CORS_ORIGINS=https://yourdomain.com
DATABASE_URL=postgresql://... (if using database)
```

### Frontend (config.js)
```javascript
const CONFIG = {
  API_URL: process.env.API_URL || 'http://localhost:5000/api',
  ENVIRONMENT: process.env.NODE_ENV || 'development'
};
```

---

## SSL/HTTPS

### Let's Encrypt (Free)

```bash
# Install certbot
apt install certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d yourdomain.com

# Auto-renewal
certbot renew --dry-run
```

### Cloudflare (Free)

1. Add your domain to Cloudflare
2. Update nameservers
3. Enable "Full" SSL
4. Done! Cloudflare provides SSL automatically

---

## Monitoring & Maintenance

### Health Checks

```bash
# Backend health
curl http://your-domain.com/health

# Expected response:
{"status":"healthy","timestamp":"..."}
```

### Logs

**Docker:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

**Heroku:**
```bash
heroku logs --tail --app ai-stack-backend
```

**AWS:**
```bash
eb logs
```

### Backups

If using database, set up automatic backups:

```bash
# Postgres backup
pg_dump dbname > backup.sql

# Restore
psql dbname < backup.sql
```

---

## Performance Optimization

### Backend
- Use Gunicorn with multiple workers
- Enable caching (Redis/Memcached)
- Optimize database queries
- Implement rate limiting

### Frontend
- Minify CSS/JS
- Optimize images
- Enable gzip compression
- Use CDN for static assets

### Example Nginx Gzip Config
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/javascript application/javascript application/json;
```

---

## Scaling

### Horizontal Scaling
- Use load balancer
- Deploy multiple backend instances
- Use cloud-managed services

### Vertical Scaling
- Increase instance size
- More RAM/CPU
- Better database

---

## Cost Estimates

### Free Tier Options
- **Frontend**: GitHub Pages, Netlify, Vercel (Free)
- **Backend**: Heroku (Free tier), Railway (500h/month)
- **Total**: $0/month

### Small Production
- **Frontend**: Netlify Pro ($19/mo)
- **Backend**: Heroku Hobby ($7/mo)
- **Total**: ~$26/month

### Medium Production
- **Frontend**: AWS S3 + CloudFront (~$5/mo)
- **Backend**: AWS t3.small (~$15/mo)
- **Database**: AWS RDS t3.micro (~$15/mo)
- **Total**: ~$35/month

### Enterprise
- **Load Balancer**: AWS ALB (~$20/mo)
- **Backend**: Multiple t3.medium (~$70/mo)
- **Database**: RDS m5.large (~$150/mo)
- **CDN**: CloudFront (~$10/mo)
- **Total**: ~$250+/month

---

## Troubleshooting

### Common Issues

**CORS Errors**
- Update backend CORS settings
- Check API_URL in frontend
- Verify origins match

**502 Bad Gateway**
- Backend not running
- Check backend logs
- Verify port configuration

**Static Files Not Loading**
- Check file paths
- Verify nginx configuration
- Clear browser cache

---

## Security Checklist

- [ ] Use HTTPS (SSL certificate)
- [ ] Set secure headers
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Regular security updates
- [ ] Input validation
- [ ] CORS properly configured
- [ ] Database credentials secured
- [ ] Backup strategy in place

---

## Support

For deployment help:
- Check logs first
- Review this guide
- Test locally before deploying
- Start with simple deployment (Heroku) before complex (AWS)

---

**Happy Deploying! 🚀**
