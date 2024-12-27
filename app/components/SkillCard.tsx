import { IconType } from 'react-icons';

interface SkillCardProps {
  icon: IconType;
  name: string;
  level: number;
}

export default function SkillCard({ icon: Icon, name, level }: SkillCardProps) {
  return (
    <div className="bg-secondary p-4 rounded-xl flex items-center gap-4">
      <Icon className="text-3xl text-primary" />
      <div className="flex-1">
        <h3 className="font-medium mb-1">{name}</h3>
        <div className="h-2 bg-background rounded-full">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </div>
  );
} 