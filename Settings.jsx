import React, { useState } from 'react';
import './settings.css';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../../components/UI/SearchBox';

const settingsSections = [
  {
    title: 'Organization',
    icon: '🏢',
    options: [
      { name: 'Profile', path: '/settings/organization/profile' },
      { name: 'Branding', path: '/settings/organization/branding' },
      { name: 'Locations', path: '/settings/organization/locations' },
      { name: 'Currencies', path: '/settings/organization/currencies' },
      { name: 'Manage Subscription', path: '/settings/organization/subscription' },
    ],
  },
  {
    title: 'Users & Roles',
    icon: '👥',
    options: [
      { name: 'Users', path: '/settings/users/users' },
      { name: 'Roles', path: '/settings/users/roles' },
      { name: 'User Preferences', path: '/settings/users/preferences' },
    ],
  },
  {
    title: 'Preferences',
    icon: '⚙️',
    options: [
      { name: 'General', path: '/settings/preferences/general' },
      { name: 'Customers and Vendors', path: '/settings/preferences/customers-vendors' },
      { name: 'Customer Portal', path: '/settings/preferences/customer-portal' },
    ],
  },
  {
    title: 'Taxes & Compliance',
    icon: '📑',
    options: [
      { name: 'Taxes', path: '/settings/taxes-compliance/taxes' },
      { name: 'Direct Taxes', path: '/settings/taxes-compliance/direct-taxes' },
      { name: 'MSME Settings', path: '/settings/taxes-compliance/msme-settings' },
    ],
  },
  {
    title: 'Items',
    icon: '📦',
    options: [
      { name: 'Items', path: '/settings/items/items' },
      { name: 'Inventory Adjustments', path: '/settings/items/inventory-adjustments' },
    ],
  },
  {
    title: 'Sales',
    icon: '🛒',
    options: [
      { name: 'Sales Orders', path: '/settings/sales/sales-orders' },
      { name: 'Packages', path: '/settings/sales/packages' },
      { name: 'Shipments', path: '/settings/sales/shipments' },
      { name: 'Delivery Challans', path: '/settings/sales/delivery-challans' },
      { name: 'Invoices', path: '/settings/sales/invoices' },
      { name: 'Payments Received', path: '/settings/sales/payments-received' },
      { name: 'Sales Returns', path: '/settings/sales/sales-returns' },
      { name: 'Credit Notes', path: '/settings/sales/credit-notes' },
    ],
  },
  {
    title: 'Purchases',
    icon: '🛍️',
    options: [
      { name: 'Bills', path: '/settings/purchases/bills' },
      { name: 'Payments Made', path: '/settings/purchases/payments-made' },
      { name: 'Purchase Orders', path: '/settings/purchases/purchase-orders' },
      { name: 'Purchase Receives', path: '/settings/purchases/purchase-receives' },
      { name: 'Vendor Credits', path: '/settings/purchases/vendor-credits' },
    ],
  },
  {
    title: 'Online Payments',
    icon: '💳',
    options: [
      { name: 'Customer Payments', path: '/settings/payments/customer-payments' },
      { name: 'Vendor Payments', path: '/settings/payments/vendor-payments' },
    ],
  },
  {
    title: 'Reminders & Notifications',
    icon: '🔔',
    options: [
      { name: 'Reminders', path: '/settings/reminders-notifications/reminders' },
      { name: 'Email Notifications', path: '/settings/reminders-notifications/email-notifications' },
      { name: 'SMS Notification', path: '/settings/reminders-notifications/sms-notification' },
    ],
  },
  {
    title: 'Automation',
    icon: '🤖',
    options: [
      { name: 'Workflow Rules', path: '/settings/automation/workflow-rules' },
      { name: 'Workflow Actions', path: '/settings/automation/workflow-actions' },
      { name: 'Workflow Logs', path: '/settings/automation/workflow-logs' },
    ],
  },
  {
    title: 'Customisation',
    icon: '🎨',
    options: [
      { name: 'Reporting Tags', path: '/settings/customisation/reporting-tags' },
      { name: 'Web Tabs', path: '/settings/customisation/web-tabs' },
      { name: 'Transaction Number Series', path: '/settings/customisation/transaction-number' },
      { name: 'PDF Templates', path: '/settings/customisation/pdf-templates' },
    ],
  },
  {
    title: 'Developer & Data',
    icon: '💻',
    options: [
      { name: 'Incoming Webhooks', path: '/settings/developer-data/incoming-webhooks' },
      { name: 'Connections', path: '/settings/developer-data/connections' },
      { name: 'API Usage', path: '/settings/developer-data/api-usage' },
      { name: 'Data Administration', path: '/settings/developer-data/data-administration' },
      { name: 'Deluge Components Usage', path: '/settings/developer-data/deluge-usage' },
    ],
  },
  {
    title: 'Integrations & Marketplace',
    icon: '🔌',
    options: [
      { name: 'Shipping', path: '/settings/integrations/shipping' },
      { name: 'Shopping Cart & POS', path: '/settings/integrations/shopping-cart-pos' },
      { name: 'eCommerce', path: '/settings/integrations/ecommerce' },
      { name: 'Accounting', path: '/settings/integrations/accounting' },
      { name: 'Sales & Marketing', path: '/settings/integrations/sales-marketing' },
      { name: 'EDI', path: '/settings/integrations/edi' },
      { name: 'SMS Integrations', path: '/settings/integrations/sms-integrations' },
      { name: 'Other Apps', path: '/settings/integrations/other-apps' },
      { name: 'WhatsApp', path: '/settings/integrations/whatsapp' },
      { name: 'Marketplace', path: '/settings/integrations/marketplace' },
    ],
  },
];

const Settings = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = settingsSections
    .map((section) => ({
      ...section,
      options: section.options.filter((opt) =>
        opt.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.options.length > 0);

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="settings-grid">
        {filteredSections.map((section, index) => (
          <div className="setting-card" key={index}>
            <div className="setting-icon">{section.icon}</div>
            <h3>{section.title}</h3>
            <ul className="sub-options-list">
              {section.options.map((opt, i) => (
                <li
                  key={i}
                  className="sub-option"
                  onClick={() => navigate(opt.path)}
                >
                  {opt.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
