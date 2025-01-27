import abc
from typing import TYPE_CHECKING, Any, Union

from qrcode.image.styledpil import StyledPilImage
from qrcode.main import QRCode

if TYPE_CHECKING:
    from qrcode.image.base import BaseImage
    from qrcode.main import ActiveWithNeighbors, QRCode

class CustomStyledPilImage(StyledPilImage):
    def drawrect_context(self, row: int, col: int, qr: QRCode[Any]):
        box = self.pixel_box(row, col)
        if self.is_eye(row, col):
            drawer = self.eye_drawer
            if getattr(self.eye_drawer, "needs_processing", False):
                return
        else:
            drawer = self.module_drawer
        
        is_active: Union[bool, ActiveWithNeighbors] = (
            qr.active_with_neighbors(row, col)
            if drawer.needs_neighbors
            else bool(qr.modules[row][col])
        )

        drawer.drawrect(box, is_active)

    def process(self) -> None:
        if getattr(self.eye_drawer, "needs_processing", False):
            self.eye_drawer.factory = self
            self.eye_drawer.draw()
        super().process()

class BaseEyeDrawer(abc.ABC):
    needs_processing    = True
    needs_neighbors     = False
    factory: "CustomStyledPilImage"

    def initialize(self, img: "BaseImage") -> None:
        self.img = img
    
    def draw(self):
        (nw_eye_top, _), (_, nw_eye_bottom) = (
            self.factory.pixel_box(0, 0),
            self.factory.pixel_box(6, 6),
        )
        (nw_eyeball_top, _), (_, nw_eyeball_bottom) = (
            self.factory.pixel_box(2, 2),
            self.factory.pixel_box(4, 4),
        )
        self.draw_nw_eye((nw_eye_top, nw_eye_bottom))
        self.draw_nw_eyeball((nw_eyeball_top, nw_eyeball_bottom))

        (ne_eye_top, _), (_, ne_eye_bottom) = (
            self.factory.pixel_box(0, self.factory.width - 7),
            self.factory.pixel_box(6, self.factory.width - 1),
        )
        (ne_eyeball_top, _), (_, ne_eyeball_bottom) = (
            self.factory.pixel_box(2, self.factory.width - 5),
            self.factory.pixel_box(4, self.factory.width - 3),
        )
        self.draw_ne_eye((ne_eye_top, ne_eye_bottom))
        self.draw_ne_eyeball((ne_eyeball_top, ne_eyeball_bottom))

        (sw_eye_top, _), (_, sw_eye_bottom) = (
            self.factory.pixel_box(self.factory.width - 7, 0),
            self.factory.pixel_box(self.factory.width - 1, 6),
        )
        (sw_eyeball_top, _), (_, sw_eyeball_bottom) = (
            self.factory.pixel_box(self.factory.width - 5, 2),
            self.factory.pixel_box(self.factory.width - 3, 4),
        )
        self.draw_sw_eye((sw_eye_top, sw_eye_bottom))
        self.draw_sw_eyeball((sw_eyeball_top, sw_eyeball_bottom))

    @abc.abstractmethod
    def draw_nw_eye(self, position): ...

    @abc.abstractmethod
    def draw_nw_eyeball(self, position): ...

    @abc.abstractmethod
    def draw_ne_eye(self, position): ...

    @abc.abstractmethod
    def draw_ne_eyeball(self, position): ...

    @abc.abstractmethod
    def draw_sw_eye(self, position): ...

    @abc.abstractmethod
    def draw_sw_eyeball(self, position): ...
