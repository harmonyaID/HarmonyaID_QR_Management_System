import qrcode
import qrcode.constants
from .drawers.base import CustomStyledPilImage
from .drawers.eyedrawers import CircleEyeDrawer, BarsEyeDrawer
from .drawers.moduledrawers import GappedCircleModuleDrawer
from qrcode.image.styles.moduledrawers.pil import SquareModuleDrawer, GappedSquareModuleDrawer, RoundedModuleDrawer, VerticalBarsDrawer, HorizontalBarsDrawer

def generate(content, name, style, image):
    if style == "pixel":
        module_drawer   = GappedSquareModuleDrawer(size_ratio = .75)
        eye_drawer      = SquareModuleDrawer()
    elif style == "circle":
        module_drawer   = GappedCircleModuleDrawer(size_ratio = .75)
        eye_drawer      = CircleEyeDrawer()
    elif style == "rounded":
        module_drawer   = RoundedModuleDrawer()
        eye_drawer      = RoundedModuleDrawer()
    elif style == "v-bars":
        module_drawer   = VerticalBarsDrawer(horizontal_shrink = .75)
        eye_drawer      = BarsEyeDrawer()
    elif style == "h-bars":
        module_drawer   = HorizontalBarsDrawer(vertical_shrink = .75)
        eye_drawer      = BarsEyeDrawer()
    else:
        module_drawer   = SquareModuleDrawer()
        eye_drawer      = SquareModuleDrawer()

    qr = qrcode.QRCode(
        version             = None,
        error_correction    = qrcode.constants.ERROR_CORRECT_H,
        box_size            = 32,
        border              = 2
    )

    qr.add_data(content)
    qr.make(fit = True)
    img = qr.make_image(
        image_factory       = CustomStyledPilImage,
        module_drawer       = module_drawer,
        eye_drawer          = eye_drawer,
        fill_color          = "black", 
        back_color          = "white",
        embeded_image_path  = image,
    )
    img.save("{}.png".format(name))
