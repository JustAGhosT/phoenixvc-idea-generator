import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChangeRecord } from "@/lib/types";
import { formatDate } from "@/lib/utils/formatters";

interface IdeaChangesProps {
  changes: ChangeRecord[];
}

export function IdeaChanges({ changes }: IdeaChangesProps) {
  // Function to get badge variant based on change type
  const getChangeTypeVariant = (changeType: string) => {
    switch (changeType) {
      case 'create': return 'default';
      case 'update': return 'secondary';
      case 'delete': return 'destructive';
      case 'import': return 'outline';
      case 'export': return 'outline';
      default: return 'default';
    }
  };
  
  // Function to format field name for display
  const formatFieldName = (fieldName: string) => {
    // Handle nested fields like "perspectives.positive"
    if (fieldName.includes('.')) {
      const parts = fieldName.split('.');
      return parts.map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' › ');
    }
    
    // Handle simple fields
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };
  
  // Function to format field value for display
  const formatFieldValue = (value: any) => {
    if (value === null || value === undefined) return "None";
    
    if (Array.isArray(value)) {
      if (value.length === 0) return "Empty list";
      return value.join(", ");
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return String(value);
  };
  
  if (changes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No changes have been recorded for this idea yet.
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {changes.map((change, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant={getChangeTypeVariant(change.changeType)}>
                {change.changeType.charAt(0).toUpperCase() + change.changeType.slice(1)}
              </Badge>
              <span className="text-sm font-medium">{change.userName}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatDate(change.timestamp)}
            </span>
          </div>
          
          <p className="text-sm mb-3">{change.description}</p>
          
          {change.fields && change.fields.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-2">Field</th>
                    <th className="text-left p-2">Old Value</th>
                    <th className="text-left p-2">New Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {change.fields.map((field, fieldIndex) => (
                    <tr key={fieldIndex} className={field.isSignificant ? "bg-amber-50 dark:bg-amber-950/20" : ""}>
                      <td className="p-2 font-medium">{formatFieldName(field.field)}</td>
                      <td className="p-2 text-muted-foreground">{formatFieldValue(field.oldValue)}</td>
                      <td className="p-2">{formatFieldValue(field.newValue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {change.audioLogUrl && (
            <div className="mt-3">
              <audio controls src={change.audioLogUrl} className="w-full h-10" />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}