import { LoadingButton } from '@mui/lab';

type Props = {
  onClick: () => void;
  loading: boolean;
  className?: string;
};
const ReloadButton = ({ onClick, loading, className }: Props) => {
  return (
    <LoadingButton onClick={onClick} loading={loading} className={className}>
      Reload
    </LoadingButton>
  );
};

export default ReloadButton;
