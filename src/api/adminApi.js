import api from './client';

/**
 * ADMIN API SERVICE LAYER
 * Centralized API integration points for the admin dashboard
 * All endpoints connect to the Django REST API backend
 */

// ==================== DASHBOARD ====================
export const dashboardApi = {
  // Get dashboard overview stats
  getStats: () => api.get('/admin/dashboard/stats/'),
  
  // Get activity log/recent events
  getActivityLog: (limit = 20) => api.get(`/admin/dashboard/activity/?limit=${limit}`),
  
  // Get system health/status
  getSystemStatus: () => api.get('/admin/dashboard/status/'),
};

// ==================== SCHOOLS / EMPLOYERS ====================
export const schoolsApi = {
  // List all schools with pagination, search, filters
  listSchools: (params) => api.get('/admin/schools/', { params }),
  
  // Get school details
  getSchool: (schoolId) => api.get(`/admin/schools/${schoolId}/`),
  
  // Create new school
  createSchool: (data) => api.post('/admin/schools/', data),
  
  // Update school
  updateSchool: (schoolId, data) => api.patch(`/admin/schools/${schoolId}/`, data),
  
  // Delete school
  deleteSchool: (schoolId) => api.delete(`/admin/schools/${schoolId}/`),
  
  // Get school subscriptions
  getSchoolSubscriptions: (schoolId) => api.get(`/admin/schools/${schoolId}/subscriptions/`),
  
  // Verify/approve school
  verifySchool: (schoolId) => api.post(`/admin/schools/${schoolId}/verify/`, {}),
  
  // Suspend school
  suspendSchool: (schoolId, data) => api.post(`/admin/schools/${schoolId}/suspend/`, data),
  
  // Get school statistics
  getSchoolStats: (schoolId) => api.get(`/admin/schools/${schoolId}/stats/`),
};

// ==================== TEACHERS / APPLICANTS ====================
export const applicantsApi = {
  // List all applicants with filters
  listApplicants: (params) => api.get('/admin/applicants/', { params }),
  
  // Get applicant details
  getApplicant: (applicantId) => api.get(`/admin/applicants/${applicantId}/`),
  
  // Update applicant
  updateApplicant: (applicantId, data) => api.patch(`/admin/applicants/${applicantId}/`, data),
  
  // Delete applicant
  deleteApplicant: (applicantId) => api.delete(`/admin/applicants/${applicantId}/`),
  
  // Verify applicant credentials
  verifyApplicant: (applicantId) => api.post(`/admin/applicants/${applicantId}/verify/`, {}),
  
  // Suspend/deactivate applicant
  suspendApplicant: (applicantId, data) => api.post(`/admin/applicants/${applicantId}/suspend/`, data),
  
  // Get applicant's applications
  getApplicantApplications: (applicantId) => api.get(`/admin/applicants/${applicantId}/applications/`),
  
  // Get applicant's documents
  getApplicantDocuments: (applicantId) => api.get(`/admin/applicants/${applicantId}/documents/`),
};

// ==================== JOB VACANCIES ====================
export const jobsApi = {
  // List all jobs with filters
  listJobs: (params) => api.get('/admin/jobs/', { params }),
  
  // Get job details
  getJob: (jobId) => api.get(`/admin/jobs/${jobId}/`),
  
  // Create job
  createJob: (data) => api.post('/admin/jobs/', data),
  
  // Update job
  updateJob: (jobId, data) => api.patch(`/admin/jobs/${jobId}/`, data),
  
  // Delete job
  deleteJob: (jobId) => api.delete(`/admin/jobs/${jobId}/`),
  
  // Publish job
  publishJob: (jobId) => api.post(`/admin/jobs/${jobId}/publish/`, {}),
  
  // Unpublish job
  unpublishJob: (jobId) => api.post(`/admin/jobs/${jobId}/unpublish/`, {}),
  
  // Get applications for a job
  getJobApplications: (jobId, params) => api.get(`/admin/jobs/${jobId}/applications/`, { params }),
  
  // Get job statistics
  getJobStats: (jobId) => api.get(`/admin/jobs/${jobId}/stats/`),
};

// ==================== APPLICATIONS ====================
export const applicationsApi = {
  // List all applications with filters
  listApplications: (params) => api.get('/admin/applications/', { params }),
  
  // Get application details
  getApplication: (applicationId) => api.get(`/admin/applications/${applicationId}/`),
  
  // Update application status
  updateApplicationStatus: (applicationId, status) => 
    api.patch(`/admin/applications/${applicationId}/`, { status }),
  
  // Shortlist application
  shortlistApplication: (applicationId) => 
    api.post(`/admin/applications/${applicationId}/shortlist/`, {}),
  
  // Reject application
  rejectApplication: (applicationId, data) => 
    api.post(`/admin/applications/${applicationId}/reject/`, data),
  
  // Move to interview
  scheduleInterview: (applicationId, data) => 
    api.post(`/admin/applications/${applicationId}/schedule-interview/`, data),
  
  // Offer job
  makeOffer: (applicationId, data) => 
    api.post(`/admin/applications/${applicationId}/offer/`, data),
};

// ==================== SUBSCRIPTIONS ====================
export const subscriptionsApi = {
  // List all subscription plans
  listPlans: (params) => api.get('/admin/subscriptions/plans/', { params }),
  
  // Get subscription plan details
  getPlan: (planId) => api.get(`/admin/subscriptions/plans/${planId}/`),
  
  // Create subscription plan
  createPlan: (data) => api.post('/admin/subscriptions/plans/', data),
  
  // Update subscription plan
  updatePlan: (planId, data) => api.patch(`/admin/subscriptions/plans/${planId}/`, data),
  
  // Delete subscription plan
  deletePlan: (planId) => api.delete(`/admin/subscriptions/plans/${planId}/`),
  
  // List all active subscriptions
  listSubscriptions: (params) => api.get('/admin/subscriptions/', { params }),
  
  // Get subscription details
  getSubscription: (subscriptionId) => api.get(`/admin/subscriptions/${subscriptionId}/`),
  
  // Upgrade subscription
  upgradeSubscription: (subscriptionId, planId) => 
    api.post(`/admin/subscriptions/${subscriptionId}/upgrade/`, { plan_id: planId }),
  
  // Cancel subscription
  cancelSubscription: (subscriptionId, data) => 
    api.post(`/admin/subscriptions/${subscriptionId}/cancel/`, data),
  
  // Get subscription invoices
  getSubscriptionInvoices: (subscriptionId) => 
    api.get(`/admin/subscriptions/${subscriptionId}/invoices/`),
};

// ==================== ANALYTICS & REPORTS ====================
export const analyticsApi = {
  // Get platform-wide analytics
  getAnalytics: (params) => api.get('/admin/analytics/', { params }),
  
  // Get job market analytics
  getJobAnalytics: (params) => api.get('/admin/analytics/jobs/', { params }),
  
  // Get applicant analytics
  getApplicantAnalytics: (params) => api.get('/admin/analytics/applicants/', { params }),
  
  // Get revenue analytics
  getRevenueAnalytics: (params) => api.get('/admin/analytics/revenue/', { params }),
  
  // Get user engagement metrics
  getEngagementMetrics: (params) => api.get('/admin/analytics/engagement/', { params }),
  
  // Generate custom report
  generateReport: (data) => api.post('/admin/reports/generate/', data),
  
  // Export data
  exportData: (format, params) => 
    api.get(`/admin/reports/export/?format=${format}`, { params }),
};

// ==================== NOTIFICATIONS ====================
export const notificationsApi = {
  // List notifications
  listNotifications: (params) => api.get('/admin/notifications/', { params }),
  
  // Get notification details
  getNotification: (notificationId) => api.get(`/admin/notifications/${notificationId}/`),
  
  // Send notification to users
  sendNotification: (data) => api.post('/admin/notifications/send/', data),
  
  // Get notification templates
  getTemplates: () => api.get('/admin/notifications/templates/'),
  
  // Create notification template
  createTemplate: (data) => api.post('/admin/notifications/templates/', data),
  
  // Update notification template
  updateTemplate: (templateId, data) => api.patch(`/admin/notifications/templates/${templateId}/`, data),
  
  // Send bulk notification campaign
  sendCampaign: (data) => api.post('/admin/notifications/campaigns/', data),
};

// ==================== MODERATION ====================
export const moderationApi = {
  // List reported content
  listReports: (params) => api.get('/admin/moderation/reports/', { params }),
  
  // Get report details
  getReport: (reportId) => api.get(`/admin/moderation/reports/${reportId}/`),
  
  // Resolve report
  resolveReport: (reportId, data) => api.patch(`/admin/moderation/reports/${reportId}/`, data),
  
  // Get flagged profiles
  getFlaggedProfiles: (params) => api.get('/admin/moderation/profiles/', { params }),
  
  // Get flagged job postings
  getFlaggedJobs: (params) => api.get('/admin/moderation/jobs/', { params }),
  
  // Ban user
  banUser: (userId, data) => api.post(`/admin/users/${userId}/ban/`, data),
  
  // Unban user
  unbanUser: (userId) => api.post(`/admin/users/${userId}/unban/`, {}),
};

// ==================== USERS / PLATFORM MANAGEMENT ====================
export const usersApi = {
  // List all users
  listUsers: (params) => api.get('/admin/users/', { params }),
  
  // Get user details
  getUser: (userId) => api.get(`/admin/users/${userId}/`),
  
  // Update user
  updateUser: (userId, data) => api.patch(`/admin/users/${userId}/`, data),
  
  // Delete user
  deleteUser: (userId) => api.delete(`/admin/users/${userId}/`),
  
  // Get user activity
  getUserActivity: (userId) => api.get(`/admin/users/${userId}/activity/`),
};

// ==================== PLATFORM SETTINGS ====================
export const settingsApi = {
  // Get all platform settings
  getSettings: () => api.get('/admin/settings/'),
  
  // Update platform settings
  updateSettings: (data) => api.patch('/admin/settings/', data),
  
  // Get email configuration
  getEmailConfig: () => api.get('/admin/settings/email/'),
  
  // Update email configuration
  updateEmailConfig: (data) => api.patch('/admin/settings/email/', data),
  
  // Get payment configuration
  getPaymentConfig: () => api.get('/admin/settings/payment/'),
  
  // Update payment configuration
  updatePaymentConfig: (data) => api.patch('/admin/settings/payment/', data),
  
  // Test email
  testEmail: (data) => api.post('/admin/settings/email/test/', data),
};

// ==================== CONTENT MANAGEMENT ====================
export const contentApi = {
  // List FAQ
  listFAQs: () => api.get('/admin/content/faqs/'),
  
  // Create FAQ
  createFAQ: (data) => api.post('/admin/content/faqs/', data),
  
  // Update FAQ
  updateFAQ: (faqId, data) => api.patch(`/admin/content/faqs/${faqId}/`, data),
  
  // Delete FAQ
  deleteFAQ: (faqId) => api.delete(`/admin/content/faqs/${faqId}/`),
  
  // Get pages
  listPages: () => api.get('/admin/content/pages/'),
  
  // Get page details
  getPage: (pageId) => api.get(`/admin/content/pages/${pageId}/`),
  
  // Create page
  createPage: (data) => api.post('/admin/content/pages/', data),
  
  // Update page
  updatePage: (pageId, data) => api.patch(`/admin/content/pages/${pageId}/`, data),
  
  // List banners
  listBanners: () => api.get('/admin/content/banners/'),
  
  // Create banner
  createBanner: (data) => api.post('/admin/content/banners/', data),
  
  // Update banner
  updateBanner: (bannerId, data) => api.patch(`/admin/content/banners/${bannerId}/`, data),
};

export default {
  dashboardApi,
  schoolsApi,
  applicantsApi,
  jobsApi,
  applicationsApi,
  subscriptionsApi,
  analyticsApi,
  notificationsApi,
  moderationApi,
  usersApi,
  settingsApi,
  contentApi,
};
