---
name: Configure Deployment Secrets
about: Checklist to set up required secrets for CI/CD and deployments
title: "chore: configure deployment secrets"
labels: chore, ci, docs
assignees: ''
---

Complete this checklist to enable deployments and optional Docker publishing.

## Required for Vercel deploys

- [ ] VERCEL_TOKEN — personal/team token
- [ ] VERCEL_ORG_ID — org ID
- [ ] VERCEL_PROJECT_ID — project ID

## Optional (app build env)

- [ ] VITE_SUPABASE_URL
- [ ] VITE_SUPABASE_ANON_KEY
- [ ] SHOPIFY_DOMAIN
- [ ] SHOPIFY_STOREFRONT_TOKEN

## Optional for Docker publish

- [ ] DOCKER_USERNAME
- [ ] DOCKER_PASSWORD

## Acceptance

- [ ] GitHub Actions → Settings → Secrets and variables → Actions contains the configured secrets
- [ ] A push to main triggers `verify` and `build-full` jobs successfully
- [ ] `deploy-vercel` job is skipped or runs based on presence of Vercel secrets
- [ ] `deploy-docker` job is skipped or runs based on presence of Docker secrets

Notes:
- PRs use a fast build path and never deploy.
- Main/production branches run full builds; deploys are gated by secrets.