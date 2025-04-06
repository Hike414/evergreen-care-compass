
import { Layout } from "@/components/layout/Layout";
import { HealthMetricsCard } from "@/components/dashboard/HealthMetricsCard";
import { MedicationReminders } from "@/components/dashboard/MedicationReminders";
import { SafetyAlerts } from "@/components/dashboard/SafetyAlerts";
import { SocialEngagement } from "@/components/dashboard/SocialEngagement";
import { VoiceAssistant } from "@/components/dashboard/VoiceAssistant";
import { QuickStats } from "@/components/dashboard/QuickStats";

const Index = () => {
  return (
    <Layout>
      <div className="dashboard-section">
        <h1 className="text-3xl font-bold mb-8">Welcome, Martha</h1>
        
        <QuickStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <HealthMetricsCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MedicationReminders />
              <SafetyAlerts />
            </div>
          </div>
          
          <div className="space-y-6">
            <VoiceAssistant />
            <SocialEngagement />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
