from PIL import Image, ImageDraw
from numpy import round
from qrcode.image.styles.moduledrawers.pil import ANTIALIASING_FACTOR, StyledPilQRModuleDrawer

class GappedCircleModuleDrawer(StyledPilQRModuleDrawer):
    """
    Draws the modules as circles with gaps
    """

    def __init__(self, size_ratio = .8):
        self.size_ratio = size_ratio

    def initialize(self, *args, **kwargs):
        super().initialize(*args, **kwargs)
        box_size = self.img.box_size
        fake_size = box_size * ANTIALIASING_FACTOR
        self.circle = Image.new(
            self.img.mode,
            (fake_size, fake_size),
            self.img.color_mask.back_color,
        )
        ImageDraw.Draw(self.circle).ellipse(
            (0, 0, fake_size, fake_size), fill=self.img.paint_color
        )

        self.delta = int(round((1 - self.size_ratio) * box_size / 2))
        small_size = int(round(box_size * self.size_ratio))
        self.circle = self.circle.resize((small_size, small_size), Image.Resampling.LANCZOS)

    def drawrect(self, box, is_active: bool):
        if is_active:
            self.img._img.paste(self.circle, (box[0][0] + self.delta , box[0][1] + self.delta))
