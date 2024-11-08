import React from 'react';
import StrategicFramework from './strategic/StrategicFramework';
import RiskManagement from './strategic/RiskManagement';
import StakeholderEngagement from './strategic/StakeholderEngagement';
import VisionMission from './strategic/VisionMission';
import ValuesIntegration from './strategic/ValuesIntegration';
import BalancedScorecard from './strategic/BalancedScorecard';

interface AgentContentProps {
  agentId: string;
  components: string[];
}

export default function AgentContent({ agentId, components }: AgentContentProps) {
  const renderComponent = (componentName: string) => {
    switch (componentName) {
      case 'StrategicFramework':
        return <StrategicFramework />;
      case 'RiskManagement':
        return <RiskManagement />;
      case 'StakeholderEngagement':
        return <StakeholderEngagement />;
      case 'VisionMission':
        return <VisionMission />;
      case 'ValuesIntegration':
        return <ValuesIntegration />;
      case 'BalancedScorecard':
        return <BalancedScorecard />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-4">
      {components.map((component, index) => (
        <div key={`${agentId}-${component}-${index}`}>
          {renderComponent(component)}
        </div>
      ))}
    </div>
  );
}