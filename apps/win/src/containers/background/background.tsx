import { connect } from 'react-redux';
import './background.scss'
import { RootState } from '../../reducers';

function Background({ image }: { image: string }) {
    return (
        <div
            className="background"
            style={{
                backgroundImage: `url(/wallpapers/${image})`,
            }}
        />
    );
}

const mapStateToProps = (state: RootState) => ({
    image: state.wallpaper.image as string,
});

export default connect(mapStateToProps)(Background);