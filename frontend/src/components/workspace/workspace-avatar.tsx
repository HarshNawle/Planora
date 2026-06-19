interface WorkspaceAvatarProps {
  color: string;
  name: string;
}

const WorkspaceAvatar = ({ color, name }: WorkspaceAvatarProps) => {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || '?';

  return (
    <div
      className='w-6 h-6 rounded flex items-center justify-center shrink-0'
      style={{ background: color }}
    >
      <span className='font-medium text-xs text-white'>{initial}</span>
    </div>
  );
};

export default WorkspaceAvatar;
