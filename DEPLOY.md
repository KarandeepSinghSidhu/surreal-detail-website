# EC2 Deployment Guide

## 1. EC2 Setup
- Ubuntu 22.04 LTS, t3.small minimum
- Security group: ports 22 (SSH), 80 (HTTP), 443 (HTTPS)

## 2. Install dependencies on EC2
```bash
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2
sudo npm install -g pm2

# Nginx
sudo apt install -y nginx

# PostgreSQL
sudo apt install -y postgresql postgresql-contrib
sudo -u postgres createuser --interactive   # create your DB user
sudo -u postgres createdb surreal_detail
```

## 3. Clone and build
```bash
git clone https://github.com/KarandeepSinghSidhu/surreal-detail-website.git
cd surreal-detail-website
npm install
cp .env.example .env   # fill in your values
npx prisma migrate deploy
npm run build
```

## 4. Start with PM2
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup   # follow the printed command to auto-start on reboot
```

## 5. Nginx
```bash
sudo cp nginx.conf /etc/nginx/sites-available/surreal-detail
sudo ln -s /etc/nginx/sites-available/surreal-detail /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 6. SSL (Certbot)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d surrealdetail.com -d www.surrealdetail.com
# Then uncomment the HTTPS block in nginx.conf and reload nginx
```

## 7. Automated reminders (cron)
```bash
crontab -e
# Add this line — runs every day at 9am to send next-day reminders:
0 9 * * * curl -X POST https://surrealdetail.com/api/admin/reminders
```
