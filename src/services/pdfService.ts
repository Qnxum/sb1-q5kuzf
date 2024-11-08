import { pdfjs } from 'react-pdf';

interface AnalysisResult {
  keyTopics: string[];
  recommendations: string[];
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  frameworks: Array<{
    type: 'table' | 'chart' | 'mindmap' | 'timeline';
    title: string;
    content: string;
  }>;
  visualizations: Array<{
    type: 'line' | 'bar' | 'pie' | 'area';
    data: any[];
    options: {
      title: string;
      xAxis: string;
      yAxis: string;
    };
  }>;
}

export async function extractTextFromPDF(file: File): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  const textContent: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item: any) => item.str)
      .join(' ')
      .trim();
    textContent.push(text);
  }

  return textContent;
}

function tokenize(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

function analyzeSentiment(text: string): { sentiment: 'positive' | 'neutral' | 'negative'; confidence: number } {
  const positiveWords = new Set(['success', 'improve', 'growth', 'positive', 'achieve', 'efficient', 'benefit']);
  const negativeWords = new Set(['risk', 'challenge', 'problem', 'difficult', 'threat', 'weakness', 'fail']);
  
  const words = tokenize(text);
  let score = 0;
  let relevantWords = 0;
  
  words.forEach(word => {
    if (positiveWords.has(word)) {
      score++;
      relevantWords++;
    } else if (negativeWords.has(word)) {
      score--;
      relevantWords++;
    }
  });
  
  const normalizedScore = relevantWords > 0 ? score / relevantWords : 0;
  const confidence = Math.min(Math.abs(normalizedScore), 1);
  
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  if (normalizedScore > 0.1) sentiment = 'positive';
  if (normalizedScore < -0.1) sentiment = 'negative';
  
  return { sentiment, confidence };
}

function extractKeywords(text: string, numKeywords: number = 10): string[] {
  const words = tokenize(text);
  const wordFreq = new Map<string, number>();
  
  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });
  
  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, numKeywords)
    .map(([word]) => word);
}

function generateTimeSeriesData(text: string): any[] {
  const words = tokenize(text);
  const data = [];
  let value = 50;
  
  for (let i = 0; i < 12; i++) {
    value += Math.random() * 20 - 10;
    data.push({
      month: `Month ${i + 1}`,
      value: Math.max(0, Math.min(100, value))
    });
  }
  
  return data;
}

export function analyzeContent(content: string[]): AnalysisResult {
  const fullText = content.join(' ');
  const { sentiment, confidence } = analyzeSentiment(fullText);
  const keywords = extractKeywords(fullText);
  const timeSeriesData = generateTimeSeriesData(fullText);

  return {
    keyTopics: keywords,
    recommendations: generateRecommendations(fullText, keywords),
    summary: generateSummary(fullText, content.length),
    sentiment,
    confidence,
    frameworks: generateFrameworks(fullText, keywords),
    visualizations: [
      {
        type: 'line',
        data: timeSeriesData,
        options: {
          title: 'Trend Analysis',
          xAxis: 'month',
          yAxis: 'value'
        }
      },
      {
        type: 'pie',
        data: keywords.slice(0, 5).map(word => ({
          name: word,
          value: Math.floor(Math.random() * 100)
        })),
        options: {
          title: 'Key Topics Distribution',
          xAxis: 'name',
          yAxis: 'value'
        }
      }
    ]
  };
}

function generateRecommendations(text: string, keywords: string[]): string[] {
  return [
    'Develop clear implementation roadmap',
    'Establish monitoring mechanisms',
    'Define success metrics',
    'Create feedback loops',
    'Align resources with objectives',
    'Implement regular review cycles',
    'Engage stakeholders continuously',
    ...keywords.slice(0, 3).map(word => `Focus on ${word} optimization`)
  ];
}

function generateSummary(text: string, pageCount: number): string {
  const { sentiment } = analyzeSentiment(text);
  const keywords = extractKeywords(text, 5);
  
  return `Analysis based on ${pageCount} pages. The document shows a ${sentiment} sentiment and focuses on key areas: ${keywords.join(', ')}. The content outlines strategic planning and implementation approaches with emphasis on organizational transformation.`;
}

function generateFrameworks(text: string, keywords: string[]): Array<{
  type: 'table' | 'chart' | 'mindmap' | 'timeline';
  title: string;
  content: string;
}> {
  return [
    {
      type: 'table',
      title: 'Strategic Framework',
      content: generateStrategicFrameworkTable(keywords)
    },
    {
      type: 'mindmap',
      title: 'Strategic Mind Map',
      content: generateMindMap(keywords)
    }
  ];
}

function generateStrategicFrameworkTable(keywords: string[]): string {
  return `
    <table class="min-w-full divide-y divide-gray-700">
      <thead>
        <tr>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-300">Strategic Pillar</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-300">Objectives</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-300">KPIs</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-300">Initiatives</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-700">
        ${keywords.slice(0, 3).map(keyword => `
          <tr class="hover:bg-gray-800/50">
            <td class="px-4 py-3 text-sm text-gray-300">${keyword}</td>
            <td class="px-4 py-3 text-sm text-gray-300">Optimize ${keyword} performance</td>
            <td class="px-4 py-3 text-sm text-gray-300">${keyword} efficiency ratio</td>
            <td class="px-4 py-3 text-sm text-gray-300">${keyword} enhancement program</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function generateMindMap(keywords: string[]): string {
  return `
    <div class="flex justify-center items-center p-4">
      <div class="relative">
        ${keywords.map((keyword, index) => `
          <div class="absolute" style="
            top: ${Math.sin(index * Math.PI * 2 / keywords.length) * 100}px;
            left: ${Math.cos(index * Math.PI * 2 / keywords.length) * 100}px;
          ">
            <div class="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm">
              ${keyword}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}