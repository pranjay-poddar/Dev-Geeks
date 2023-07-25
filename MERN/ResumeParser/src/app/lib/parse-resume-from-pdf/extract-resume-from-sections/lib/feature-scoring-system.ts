import type {
  TextItems,
  TextScores,
  FeatureSet,
} from "lib/parse-resume-from-pdf/types";

const computeFeatureScores = (
  textItems: TextItems,
  featureSets: FeatureSet[]
): TextScores => {
  const textScores = textItems.map((item) => ({
    text: item.text,
    score: 0,
    match: false,
  }));

  for (let i = 0; i < textItems.length; i++) {
    const textItem = textItems[i];

    for (const featureSet of featureSets) {
      const [hasFeature, score, returnMatchingText] = featureSet;
      const result = hasFeature(textItem);
      if (result) {
        let text = textItem.text;
        if (returnMatchingText && typeof result === "object") {
          text = result[0];
        }

        const textScore = textScores[i];
        if (textItem.text === text) {
          textScore.score += score;
          if (returnMatchingText) {
            textScore.match = true;
          }
        } else {
          textScores.push({ text, score, match: true });
        }
      }
    }
  }
  return textScores;
};

/**
 * Core util for the feature scoring system.
 *
 * It runs each text item through all feature sets and sums up the matching feature scores.
 * It then returns the text item with the highest computed feature score.
 */
export const getTextWithHighestFeatureScore = (
  textItems: TextItems,
  featureSets: FeatureSet[],
  returnEmptyStringIfHighestScoreIsNotPositive = true
) => {
  const textScores = computeFeatureScores(textItems, featureSets);

  let textWithHighestFeatureScore = "";
  let highestScore = -Infinity;
  for (const { text, score } of textScores) {
    if (score > highestScore) {
      textWithHighestFeatureScore = text;
      highestScore = score;
    }
  }

  if (returnEmptyStringIfHighestScoreIsNotPositive && highestScore <= 0)
    return ["", textScores] as const;

  return [textWithHighestFeatureScore, textScores] as const;
};
