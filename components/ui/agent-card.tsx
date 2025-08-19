import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface Agent {
  name: string;
  position: string;
  email: string;
  phone: string;
  ic?: string;
  photo: string;
  about: string;
}

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
      <CardHeader className="text-center space-y-4">
        <div className="w-32 h-32 mx-auto relative overflow-hidden rounded-full">
          <Image 
            src={agent.photo} 
            alt={agent.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 128px, 128px"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900">{agent.name}</h3>
          <p className="text-sm text-slate-600">{agent.position}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-sm text-slate-700 leading-relaxed">
          {agent.about}
        </p>
        
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-sm font-medium text-slate-500 sm:w-16">Email:</span>
            <a 
              href={`mailto:${agent.email}`}
              className="text-sm text-slate-700 hover:text-slate-900 transition-colors break-all"
            >
              {agent.email}
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-sm font-medium text-slate-500 sm:w-16">Phone:</span>
            <a 
              href={`tel:${agent.phone}`}
              className="text-sm text-slate-700 hover:text-slate-900 transition-colors"
            >
              {agent.phone}
            </a>
          </div>
          
          {agent.ic && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500 w-16">IČ:</span>
              <span className="text-sm text-slate-700">{agent.ic}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}