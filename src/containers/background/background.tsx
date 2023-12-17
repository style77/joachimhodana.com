import { connect } from 'react-redux';
import './background.scss'

function Background({ image }) {
    return (
        <div
            className="background"
            style={{
                backgroundImage: `url(/wallpapers/${image})`,
            }}
        />
    );
}

const mapStateToProps = state => ({
    image: state.wallpaper.image,
});

export default connect(mapStateToProps)(Background);