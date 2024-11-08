import React from 'react';
import { Table, ChevronDown, ChevronUp } from 'lucide-react';

interface StrategicFrameworkProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export default function StrategicFramework({ 
  isExpanded = true, 
  onToggleExpand = () => {} 
}: StrategicFrameworkProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <button
        onClick={onToggleExpand}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Table className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">Strategic Framework</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-gray-700 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Pillars</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Problem Statement</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Goals</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Long-Term Outcomes</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Mid-Term Outcomes</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Short-Term Outcomes</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Outputs</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Activities</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Inputs</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Impact Statement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm text-gray-300">Strategic Planning</td>
                <td className="px-4 py-3 text-sm text-gray-300">Lack of clear organizational direction</td>
                <td className="px-4 py-3 text-sm text-gray-300">Establish clear strategic vision</td>
                <td className="px-4 py-3 text-sm text-gray-300">Sustainable competitive advantage</td>
                <td className="px-4 py-3 text-sm text-gray-300">Improved market position</td>
                <td className="px-4 py-3 text-sm text-gray-300">Clear objectives defined</td>
                <td className="px-4 py-3 text-sm text-gray-300">Strategic plan document</td>
                <td className="px-4 py-3 text-sm text-gray-300">Stakeholder workshops</td>
                <td className="px-4 py-3 text-sm text-gray-300">Market analysis data</td>
                <td className="px-4 py-3 text-sm text-gray-300">Enhanced organizational direction</td>
              </tr>
              <tr className="hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm text-gray-300">Operational Excellence</td>
                <td className="px-4 py-3 text-sm text-gray-300">Inefficient processes</td>
                <td className="px-4 py-3 text-sm text-gray-300">Optimize operations</td>
                <td className="px-4 py-3 text-sm text-gray-300">Industry-leading efficiency</td>
                <td className="px-4 py-3 text-sm text-gray-300">Streamlined workflows</td>
                <td className="px-4 py-3 text-sm text-gray-300">Process improvements</td>
                <td className="px-4 py-3 text-sm text-gray-300">Efficiency metrics</td>
                <td className="px-4 py-3 text-sm text-gray-300">Process mapping</td>
                <td className="px-4 py-3 text-sm text-gray-300">Current process data</td>
                <td className="px-4 py-3 text-sm text-gray-300">Improved operational efficiency</td>
              </tr>
              <tr className="hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm text-gray-300">Innovation</td>
                <td className="px-4 py-3 text-sm text-gray-300">Limited new product development</td>
                <td className="px-4 py-3 text-sm text-gray-300">Drive innovation</td>
                <td className="px-4 py-3 text-sm text-gray-300">Market leadership</td>
                <td className="px-4 py-3 text-sm text-gray-300">New product launches</td>
                <td className="px-4 py-3 text-sm text-gray-300">Prototype development</td>
                <td className="px-4 py-3 text-sm text-gray-300">Innovation metrics</td>
                <td className="px-4 py-3 text-sm text-gray-300">R&D initiatives</td>
                <td className="px-4 py-3 text-sm text-gray-300">Research resources</td>
                <td className="px-4 py-3 text-sm text-gray-300">Enhanced market competitiveness</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}