import { CirclePlus, LayoutGrid } from 'lucide-react';
import { Button } from './ui/button';

interface NoDataFound {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
}

const NoDataFound = ({
  title,
  description,
  buttonText,
  buttonAction
}: NoDataFound) => {
  return (
    <div className='flex flex-col items-center justify-center h-full' >
      <LayoutGrid className='size-12 mx-auto text-muted-foreground' />
      <h3 className='mt-4 text-lg font-semibold' >{title}</h3>

      <p className='mt-2 text-sm text-muted-foreground mx-w-sm mx-auto' >{description}</p>
      <Button className='mt-4' onClick={buttonAction} >
        <CirclePlus className="size-4 mr-2" />
        {buttonText}
      </Button>
    </div>
  )
}

export default NoDataFound