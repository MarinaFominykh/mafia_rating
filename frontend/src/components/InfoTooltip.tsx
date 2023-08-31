import React, {FC} from 'react';
import styles from '@/styles/InfoTooltip.module.scss';


interface InfoTooltipProps {
    error: any
}

const InfoTooltip: FC<InfoTooltipProps> = ({error}) => {
  return (
   <span className={styles.error}>{error || ""}</span>
  )
}

export default InfoTooltip
