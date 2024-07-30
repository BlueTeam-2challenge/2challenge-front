export interface TableProps {
  data?: Animal[];
  onDelete?: () => void;
  onEdit?: () => void;
}

export interface Animal {
  id: string;
  name: string;
  description: string;
  breed: string;
  category: string;
  createdAt: string;
}
