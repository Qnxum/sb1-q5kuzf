import React from 'react';
import { Target, AlertTriangle, Users, Eye, Heart, LayoutDashboard } from 'lucide-react';
import StrategicFramework from '../strategic/StrategicFramework';
import RiskManagement from '../strategic/RiskManagement';
import StakeholderEngagement from '../strategic/StakeholderEngagement';
import VisionMission from '../strategic/VisionMission';
import ValuesIntegration from '../strategic/ValuesIntegration';
import BalancedScorecard from '../strategic/BalancedScorecard';

export default function StrategicViews() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-white mb-4">Strategic Views</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          <Target className="w-5 h-5 text-blue-400" />
          <span className="text-gray-300">Strategic Framework</span>
        </button>
        
        <button className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          <AlertTriangle className="w-5 h-5 text-blue-400" />
          <span className="text-gray-300">Risk Management</span>
        </button>
        
        <button className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          <Users className="w-5 h-5 text-blue-400" />
          <span className="text-gray-300">Stakeholder Engagement</span>
        </button>
        
        <button className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          <Eye className="w-5 h-5 text-blue-400" />
          <span className="text-gray-300">Vision & Mission</span>
        </button>
        
        <button className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          <Heart className="w-5 h-5 text-blue-400" />
          <span className="text-gray-300">Values Integration</span>
        </button>
        
        <button className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          <LayoutDashboard className="w-5 h-5 text-blue-400" />
          <span className="text-gray-300">Balanced Scorecard</span>
        </button>
      </div>
    </div>
  );
}