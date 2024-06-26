import {render, screen} from "@testing-library/react" 
import { PostCard } from '.'
import { postCardPropsMocks } from './mock'

const props = postCardPropsMocks;


describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...props}/>);

    expect(screen.getByAltText( /title 1/i ))
     .toHaveAttribute('src', 'img/img.png');

    expect(screen.getByRole('heading', {name: /title 1/i}))
     .toBeInTheDocument();

     expect(screen.getByText('body 1', {name: /title 1/i}))
     .toBeInTheDocument();
  })

  it('should match snapshot', () => {
      const {container} = render(<PostCard {...props}/>);
      expect(container.firstChild).toMatchSnapshot();
  })
})