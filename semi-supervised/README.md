These are experiments on Telugu OCR systems.

- Character level labeled data has been obtained from [here](https://github.com/srikarym/OCR_Telugu_code).
- Trying to use this data for creating a pre-text task, and train a model to try and distinguish between the characters using contrastive learning. 
- Using semi-supervised methods like contrastive learning is useless because I am using labeled data for creating classes so this is just an experiment.

* After training the "pretext task", I will try to use it for training the OCR on very small amount of data compared to the original paper.

