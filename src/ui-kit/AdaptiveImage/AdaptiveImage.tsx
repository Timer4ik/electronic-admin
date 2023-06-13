import React, { FC } from 'react'
import "./AdaptiveImage.scss"

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {

}

export const AdaptiveImage: FC<Props> = ({ width, height, ...props }) => {
  return (
    <div className='adaptive__image' >
      <img src="" alt="" width={width}
        {...props}
        height={height} />
    </div>
  )
}

