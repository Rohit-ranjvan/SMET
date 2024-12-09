import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root";
import Home from "../pages/center";
import Analytics from "../pages/analytics";
import ReportsSales from "../pages/reports-sales";
import ReportsLeads from "../pages/reports-leads";
import ReportsProject from "../pages/reports-project";
import AppsChat from "../pages/apps-chat";
import LayoutApplications from "../layout/layoutApplications";
import AppsEmail from "../pages/apps-email";
import ReportsTimesheets from "../pages/reports-timesheets";
import LoginCover from "../pages/login-cover";
import AppsTasks from "../pages/apps-tasks";
import AppsNotes from "../pages/apps-notes";
import AppsCalender from "../pages/apps-calender";
import AppsStorage from "../pages/apps-storage";
import Proposalist from "../pages/proposal-list";
import CustomersList from "../pages/customers-list";
import ProposalView from "../pages/proposal-view";
import ProposalEdit from "../pages/proposal-edit";
import LeadsList from "../pages/leadsList";
import CustomersView from "../pages/customers-view";
import CustomersCreate from "../pages/customers-create";
import ProposalCreate from "../pages/proposal-create";
import LeadsView from "../pages/leads-view";
import LeadsCreate from "../pages/leads-create";
import PaymentList from "../pages/payment-list";
import PaymentView from "../pages/payment-view/";
import PaymentCreate from "../pages/payment-create";
import ProjectsList from "../pages/projects-list";
import ProjectsView from "../pages/projects-view";
import ProjectsCreate from "../pages/projects-create";
import SettingsGaneral from "../pages/settings-ganeral";
import LayoutSetting from "../layout/layoutSetting";
import SettingsSeo from "../pages/settings-seo";
import SettingsTags from "../pages/settings-tags";
import SettingsEmail from "../pages/settings-email";
import SettingsTasks from "../pages/settings-tasks";
import SettingsLeads from "../pages/settings-leads";
import SettingsMiscellaneous from "../pages/settings-miscellaneous";
import SettingsRecaptcha from "../pages/settings-recaptcha";
import SettingsLocalization from "../pages/settings-localization";
import SettingsCustomers from "../pages/settings-customers";
import SettingsGateways from "../pages/settings-gateways";
import SettingsFinance from "../pages/settings-finance";
import SettingsSupport from "../pages/settings-support";
import LayoutAuth from "../layout/layoutAuth";
import LoginMinimal from "../pages/login-minimal";
import LoginCreative from "../pages/login-creative";
import RegisterCover from "../pages/register-cover";
import RegisterMinimal from "../pages/register-minimal";
import RegisterCreative from "../pages/register-creative";
import ResetCover from "../pages/reset-cover";
import ResetMinimal from "../pages/reset-minimal";
import ResetCreative from "../pages/reset-creative";
import ErrorCover from "../pages/error-cover";
import ErrorCreative from "../pages/error-creative";
import ErrorMinimal from "../pages/error-minimal";
import OtpCover from "../pages/otp-cover";
import OtpMinimal from "../pages/otp-minimal";
import OtpCreative from "../pages/otp-creative";
import MaintenanceCover from "../pages/maintenance-cover";
import MaintenanceMinimal from "../pages/maintenance-minimal";
import MaintenanceCreative from "../pages/maintenance-creative";
import HelpKnowledgebase from "../pages/help-knowledgebase";
import WidgetsLists from "../pages/widgets-lists";
import WidgetsTables from "../pages/widgets-tables";
import WidgetsCharts from "../pages/widgets-charts";
import WidgetsStatistics from "../pages/widgets-statistics";
import WidgetsMiscellaneous from "../pages/widgets-miscellaneous";
import Center from "../pages/center";
import Youth from "../pages/reports-sales";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginCreative />,
        
    },
    {
        path: "/home",
        element: <RootLayout />,
        children: [
            {
                path: "/home/centers",
                element: <Center/>
            },
            // {
            //     path: "/dashboards/analytics",
            //     element: <Analytics />
            // },
            {
                path: "/home/youths/register-youth",
                element: <Youth />
            },
            {
                path: "/home/reports/leads",
                element: <ReportsLeads />
            },
            {
                path: "/home/reports/project",
                element: <ReportsProject />
            },
            {
                path: "/home/reports/timesheets",
                element: <ReportsTimesheets />
            },
            {
                path: "/home/proposal/list",
                element: <Proposalist />
            },
            {
                path: "/home/proposal/view",
                element: <ProposalView />
            },
            {
                path: "/home/proposal/edit",
                element: <ProposalEdit />
            },
            {
                path: "/home/proposal/create",
                element: <ProposalCreate />
            },
            {
                path: "/home/payment/list",
                element: <PaymentList />
            },
            {
                path: "/home/payment/view",
                element: <PaymentView />
            },
            {
                path: "/home/payment/create",
                element: <PaymentCreate />
            },
            {
                path: "/home/customers/list",
                element: <CustomersList />
            },
            {
                path: "/home/customers/view",
                element: <CustomersView />
            },
            {
                path: "/home/customers/create",
                element: <CustomersCreate />
            },
            {
                path: "/home/leads/list",
                element: <LeadsList />
            },
            {
                path: "/home/leads/view",
                element: <LeadsView />
            },
            {
                path: "/home/leads/create",
                element: <LeadsCreate />
            },
            {
                path: "/home/projects/list",
                element: <ProjectsList />
            },
            {
                path: "/home/projects/view",
                element: <ProjectsView />
            },
            {
                path: "/home/projects/create",
                element: <ProjectsCreate />
            },
            {
                path: "/home/widgets/lists",
                element: <WidgetsLists />
            },
            {
                path: "/home/widgets/tables",
                element: <WidgetsTables />
            },
            {
                path: "/home/widgets/charts",
                element: <WidgetsCharts/>
            },
            {
                path: "/home/widgets/statistics",
                element: <WidgetsStatistics/>
            },
            {
                path: "/home/widgets/miscellaneous",
                element: <WidgetsMiscellaneous/>
            },
            {
                path: "/home/help/knowledgebase",
                element: <HelpKnowledgebase />
            },

        ]
    },
    {
        path: "/home",
        element: <LayoutApplications />,
        children: [
            {
                path: "/home/applications/chat",
                element: <AppsChat />
            },
            {
                path: "/home/applications/email",
                element: <AppsEmail />
            },
            {
                path: "/home/applications/tasks",
                element: <AppsTasks />
            },
            {
                path: "/home/applications/notes",
                element: <AppsNotes />
            },
            {
                path: "/home/applications/calender",
                element: <AppsCalender />
            },
            {
                path: "/home/applications/storage",
                element: <AppsStorage />
            },
        ]
    },
    {
        path: "/home",
        element: <LayoutSetting />,
        children: [
            {
                path: "/home/settings/ganeral",
                element: <SettingsGaneral />
            },
            {
                path: "/home/settings/seo",
                element: <SettingsSeo />
            },
            {
                path: "/home/settings/tags",
                element: <SettingsTags />
            },
            {
                path: "/home/settings/email",
                element: <SettingsEmail />
            },
            {
                path: "/home/settings/tasks",
                element: <SettingsTasks />
            },
            {
                path: "/home/settings/leads",
                element: <SettingsLeads />
            },
            {
                path: "/home/settings/Support",
                element: <SettingsSupport />
            },
            {
                path: "/home/settings/finance",
                element: <SettingsFinance />
            },
            {
                path: "/home/settings/gateways",
                element: <SettingsGateways />
            },
            {
                path: "/home/settings/customers",
                element: <SettingsCustomers />
            },
            {
                path: "/home/settings/localization",
                element: <SettingsLocalization />
            },
            {
                path: "/home/settings/recaptcha",
                element: <SettingsRecaptcha />
            },
            {
                path: "/home/settings/miscellaneous",
                element: <SettingsMiscellaneous />
            },
        ]
    },
    {
        path: "/home",
        element: <LayoutAuth />,
        children: [
           
            {
                path: "/home/authentication/login",
                element: <LoginCreative />
            },
            {
                path: "/home/authentication/register/cover",
                element: <RegisterCover />
            },
            {
                path: "/home/authentication/register/minimal",
                element: <RegisterMinimal />
            },
            {
                path: "/home/authentication/register/creative",
                element: <RegisterCreative />
            },
            {
                path: "/home/authentication/reset/cover",
                element: <ResetCover />
            },
            {
                path: "/home/authentication/reset/minimal",
                element: <ResetMinimal />
            },
            {
                path: "/home/authentication/reset/creative",
                element: <ResetCreative />
            },
            {
                path: "/home/authentication/404/cover",
                element: <ErrorCover />
            },
            {
                path: "/home/authentication/404/minimal",
                element: <ErrorMinimal />
            },
            {
                path: "/home/authentication/404/creative",
                element: <ErrorCreative />
            },
            {
                path: "/home/authentication/verify/cover",
                element: <OtpCover />
            },
            {
                path: "/home/authentication/verify/minimal",
                element: <OtpMinimal />
            },
            {
                path: "/home/authentication/verify/creative",
                element: <OtpCreative />
            },
            {
                path: "/home/authentication/maintenance/cover",
                element: <MaintenanceCover />
            },
            {
                path: "/home/authentication/maintenance/minimal",
                element: <MaintenanceMinimal />
            },
            {
                path: "/home/authentication/maintenance/creative",
                element: <MaintenanceCreative />
            },
        ]
    }
])