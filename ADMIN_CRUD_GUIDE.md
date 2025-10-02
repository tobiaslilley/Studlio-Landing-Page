# Admin CRUD Functionality Guide

## Overview
I've successfully implemented full CRUD (Create, Read, Update, Delete) functionality for both **Protocols** and **Health Metrics** in your admin section. This allows you to manage your database content directly from the web interface when authenticated.

## What's Been Added

### 1. **Protocols Management**
- **View all protocols** with search functionality
- **Add new protocols** with all required fields
- **Edit existing protocols** with pre-populated forms
- **Delete protocols** with confirmation
- **Link protocols to health metrics** via multi-select dropdown

### 2. **Health Metrics Management**
- **View all health metrics** with search functionality
- **Add new health metrics** with HealthKit integration
- **Edit existing metrics** with all configuration options
- **Delete metrics** with confirmation
- **Configure metric properties** (kind, preferred stats, units, etc.)
- **Assign health categories** using the existing category system

## Database Structure Understanding

### Protocols Table
- `id` (UUID, primary key)
- `name` (text, required)
- `category` (text, required) - Diet, Exercise, Sleep, Supplement, etc.
- `description` (text, optional)
- `unit` (text, optional) - e.g., "mg", "days", "hours"
- `default_value` (numeric, optional)
- `metric_ids` (UUID array) - Links to health_metrics table
- `is_default` (boolean) - Mark as default protocol
- `created_at`, `updated_at` (timestamps)

### Health Metrics Table
- `id` (UUID, primary key)
- `name` (text, required)
- `identifier` (text, required, unique) - HealthKit identifier
- `unit` (text, required)
- `kind` (enum) - quantity, category, correlation, workout, series, electrocardiogram
- `preferred_stats` (array) - sum, avg, min, max, etc.
- `unit_internal` (text, optional)
- `unit_display_strategy` (enum) - by_locale, fixed, from_device
- `created_at` (timestamp)

## How to Use

### Accessing the Admin Panel
1. Go to `admin.html` in your browser
2. Sign in with your email (magic link authentication)
3. You'll see the admin dashboard with new management cards

### Managing Protocols
1. Click **"Manage Protocols"** to view all protocols
2. Use the search bar to filter protocols
3. Click **"Add New Protocol"** to create a new one
4. Click **"Edit"** on any protocol to modify it
5. Click **"Delete"** to remove a protocol (with confirmation)

### Managing Health Metrics
1. Click **"Manage Health Metrics"** to view all metrics
2. Use the search bar to filter metrics
3. Click **"Add New Metric"** to create a new one
4. Click **"Edit"** on any metric to modify it
5. Click **"Delete"** to remove a metric (with confirmation)

## Key Features

### ✅ **Data Validation**
- Required fields are enforced
- Proper data types (numbers, arrays, etc.)
- Unique constraints respected (e.g., HealthKit identifiers)

### ✅ **User Experience**
- Clean, modern interface
- Responsive design for mobile/desktop
- Real-time search functionality
- Confirmation dialogs for destructive actions
- Success/error messages

### ✅ **Security**
- Authentication required (Supabase magic link)
- XSS protection with HTML escaping
- Proper form validation

### ✅ **Database Integration**
- Direct Supabase integration
- Proper error handling
- Optimistic updates with refresh

## Form Fields Explained

### Protocol Form
- **Name**: Display name for the protocol
- **Category**: Predefined categories (Diet, Exercise, Sleep, etc.)
- **Description**: Detailed explanation of the protocol
- **Unit**: Measurement unit (mg, days, hours, etc.)
- **Default Value**: Suggested starting value
- **Related Health Metrics**: Multi-select of available metrics
- **Set as Default**: Mark this as a default protocol

### Health Metric Form
- **Name**: Display name for the metric
- **HealthKit Identifier**: Full HealthKit identifier (e.g., HKQuantityTypeIdentifierStepCount)
- **Unit**: Display unit (count, kcal, mg/dL, etc.)
- **Kind**: Type of HealthKit data
- **Preferred Stats**: How to aggregate the data (sum, average, etc.)
- **Internal Unit**: Unit used for calculations
- **Unit Display Strategy**: How to show units to users
- **Health Categories**: Multi-select from existing categories (Cardiovascular, Metabolic, etc.)

## Best Practices

1. **Protocols**: Always link protocols to relevant health metrics for better tracking
2. **Health Metrics**: Use proper HealthKit identifiers for iOS integration
3. **Categories**: Use consistent category names across protocols
4. **Health Categories**: Assign metrics to appropriate health categories for better organization
5. **Units**: Be consistent with unit naming (e.g., always use "mg" not "milligrams")

## Troubleshooting

### Common Issues
- **"Error loading data"**: Check your Supabase connection and RLS policies
- **"Cannot delete"**: Ensure no other records reference the item you're trying to delete
- **"Form validation errors"**: Check that required fields are filled and data types are correct

### Database Permissions
✅ **Secure RLS Policies Configured**: The RLS (Row Level Security) policies have been set up with **admin-only access**:

**Read Access (Public)**:
- Anyone can SELECT from protocols, health_metrics, health_categories, and health_metric_categories tables
- This allows your iOS app users to read the data without authentication

**Write Access (Admin Only)**:
- Only the specific admin user (`tobylilley@gmail.com`) can INSERT, UPDATE, or DELETE
- Your iOS app users **cannot** modify any admin data
- Admin user ID: `12506cb4-95dc-4220-ae03-e17bfc9cd8f4`

**Security**: This setup ensures that only you (as admin) can manage the content, while your iOS app users can read the data but cannot modify it.

### Adding More Admin Users
If you need to add more admin users in the future, you can:
1. Create a new user in Supabase Auth
2. Update the RLS policies to include the new user's UUID
3. Or create a more flexible system using a dedicated admin table

**Current Admin User**: `tobylilley@gmail.com` (ID: `12506cb4-95dc-4220-ae03-e17bfc9cd8f4`)

## Next Steps

You can now:
1. **Populate your database** with initial protocols and metrics
2. **Test the CRUD operations** to ensure everything works
3. **Customize the categories** in the protocol form if needed
4. **Add more health metrics** as your app grows
5. **Link protocols to metrics** for better user experience

The system is ready to use and will help you manage your STUDL.IO content efficiently!
