from django.db import models
import pytesseract
import PIL

# Create your models here.

class Image(models.Model):
    img = models.ImageField()
    tess_preds = models.JSONField(blank=True, null=True)
    my_preds = models.JSONField(blank=True, null=True)
    uploaded = models.DateTimeField(auto_now_add=True)
    uid = models.TextField(null=True,default='')
    def __str__(self):
        return "Uploaded_at_{}".format(self.uploaded.strftime('%Y-%m-%d %H:%M'))
    
    def save(self, *args, **kwargs):
        try:
            im = PIL.Image.open(self.img)
            im_data = pytesseract.image_to_data(im, lang='tel')
            # print(dict(im_data))
            g = [list(x.split('\t')) for x in list(im_data.split('\n'))]
            # print(g)
            self.tess_preds = []
            self.my_preds = []
            for i in g[1:]:
                k = {}
                if (len(i)>10):
                    if int(i[10]) > 50:
                        k["left"] = int(i[6])
                        k["top"] = int(i[7])
                        k["width"] = int(i[8])
                        k["height"] = int(i[9])
                        k["text"] = i[11]
                        l = [int(i[6]),int(i[7]), int(i[8]) , int(i[9])]
                        self.my_preds.append(l)
                        self.tess_preds.append(k)
        except Exception as e:
            print(e)
        super().save(*args, **kwargs)