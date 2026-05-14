# 🔒 VPS Post-Deploy Security Setup Guide

## Overview

এই guide টি yousef-frontend project এর জন্য security setup describe করে।

---

## 📋 Prerequisites

আপনার VPS এ থাকতে হবে:

- Ubuntu 20.04 / 22.04 LTS
- Node.js 16+ and npm/pnpm
- PM2 (optional, for process management)
- Nginx (for reverse proxy)
- Docker & Docker Compose (optional)

---

## ✅ What's Been Setup

### GitHub Actions Workflow

**Location:** `.github/workflows/security-cleanup.yml`

**What it does:**

- ✅ Scans for suspicious filenames (temp_auto_push, config.bat, malware, etc.)
- ✅ Removes .bat, .ps1, .cmd files
- ✅ Detects obfuscated JavaScript (eval, Function, global[...])
- ✅ Scans Next.js/React config files for malicious code
- ✅ Checks .gitignore for suspicious entries
- ✅ Generates scan report & uploads as artifact
- ✅ Comments on PRs with findings
- ✅ Prevents deployment if malicious code detected

---

## 🚀 Quick Start

### 1. Verify Workflow is Active

1. Go to: `https://github.com/YOUR_USERNAME/yousef-frontend`
2. Click "Actions" tab
3. You should see "Security Cleanup - Malware Detection & Removal" workflow
4. Make sure it's enabled

### 2. Test Workflow

1. Make any small change to the repo
2. Create a branch and push
3. Open a Pull Request
4. The workflow will automatically run
5. Check if GitHub Actions shows the security scan results

### 3. Merge & Deploy

1. If scan passes (no suspicious code), you can merge to main
2. When you push to main, deployment will trigger
3. If you have a post-deploy cleanup script, it will run on VPS

---

## 📊 GitHub Actions Artifacts

After each run, you can download the scan report:

1. Go to Actions tab
2. Click on a workflow run
3. Scroll down to "Artifacts"
4. Download "malware-scan-report"
5. View `malware_scan.log`

---

## 🔐 GitHub Security Checklist

### Essential Steps:

1. **✅ Change Password**
   - Settings → Password and authentication → Change password

2. **✅ Enable 2FA**
   - Settings → Password and authentication → Two-factor authentication
   - Use Google Authenticator or Microsoft Authenticator
   - Save backup codes

3. **✅ Revoke Suspicious Tokens**
   - Settings → Developer settings → Personal access tokens
   - Delete any unfamiliar tokens

4. **✅ Audit SSH Keys**
   - Settings → SSH and GPG keys
   - Remove any unfamiliar keys

5. **✅ Remove Unknown Collaborators**
   - Repository → Settings → Collaborators and teams
   - Remove suspicious users

6. **✅ Enable Branch Protection**
   - Repository → Settings → Branches
   - Add rule for `main` and `dev`:
     - Require pull request reviews
     - Require status checks (GitHub Actions)
     - Dismiss stale PR approvals

---

## 🚨 If Malicious Code is Detected

### Step 1: Check GitHub Actions Output

1. Go to Actions tab
2. Find the failed run
3. Click "Security Cleanup - Malware Detection & Removal"
4. Check the job output
5. Look for red ⚠️ warnings about suspicious files

### Step 2: Revert Malicious Commit

```bash
# On your local machine
git log --oneline | head -20
git revert <suspicious-commit-hash>
git push origin main
```

### Step 3: Audit Recent Changes

1. Go to `https://github.com/YOUR_USERNAME/yousef-frontend/commits/main`
2. Check recent commits
3. Review who made the changes
4. If not you, revoke their access immediately

### Step 4: Contact GitHub Support

- Report the security incident
- Ask for account audit
- Request access logs

---

## 📈 Best Practices

### Before Every Merge:

- [ ] No new `.bat`, `.ps1`, `.cmd` files
- [ ] No obfuscated JavaScript in config
- [ ] No suspicious imports
- [ ] GitHub Actions workflow passed ✅
- [ ] Only authorized changes

### Regular Maintenance:

```bash
# Weekly: Check GitHub Actions logs
# Go to repo → Actions → Review recent runs

# Monthly: Audit access & tokens
# Go to GitHub Settings → Check collaborators & tokens

# Monthly: Review recent commits
# Go to repo → Commits → Check recent activity
```

---

## ✅ Verification Checklist

- [ ] `.github/workflows/security-cleanup.yml` exists
- [ ] Workflow is enabled and running on push/PR
- [ ] GitHub Actions shows successful security scans
- [ ] Branch protection enabled on main/dev
- [ ] 2FA enabled on GitHub account
- [ ] All suspicious tokens revoked
- [ ] No unknown collaborators
- [ ] Recent commits look legitimate

---

## 🆘 Troubleshooting

### Workflow Not Running

1. Check if `.github/workflows/security-cleanup.yml` exists
2. Go to Actions → Check if workflow is enabled
3. Push a test commit to trigger it
4. Wait 30-60 seconds for GitHub Actions to start

### PR Not Showing Scan Results

1. Go to Pull Request
2. Scroll down to "Checks"
3. Click "Details" next to the failed check
4. View the workflow output

### Workflow Always Fails

1. Check if there's legitimate code that triggers false positives
2. Review the log for specific file names
3. If legitimate, you can manually merge (but not recommended)

---

## 📞 Next Steps

1. **Setup VPS Cleanup Script** - Ask for VPS setup guide
2. **Enable Branch Protection** - Prevent unauthorized merges
3. **Monitor GitHub Actions** - Check workflow runs weekly
4. **Regular Audits** - Review collaborators monthly

---

**Last Updated:** May 14, 2026
**Setup Status:** ✅ Complete
**GitHub Actions:** ✅ Enabled
