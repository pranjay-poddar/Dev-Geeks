/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.awt.Color;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.knowm.xchart.XChartPanel;
import org.knowm.xchart.XYChart;
import org.knowm.xchart.XYChartBuilder;
import org.knowm.xchart.XYSeries;
import org.knowm.xchart.demo.charts.ExampleChart;
import org.knowm.xchart.style.Styler;
import org.knowm.xchart.style.Styler.ChartTheme;
import org.knowm.xchart.style.Styler.LegendPosition;
import org.knowm.xchart.style.Styler.TextAlignment;

public class LibraryExpenditurePerYear implements ExampleChart<XYChart> 
{
  public XChartPanel getPanel() {

    ExampleChart<XYChart> exampleChart = new LibraryExpenditurePerYear();
    XYChart chart = exampleChart.getChart();
    XChartPanel panel=new XChartPanel(chart);
    return panel;
  }

  @Override
  public XYChart getChart() {
      Connection con = DbConnect.getConnection();
    // generates Log data
    List<Double> xData = new ArrayList<>();
    List<Double> yData = new ArrayList<>();
    // Create Chart
    XYChart chart =
        new XYChartBuilder()
            .width(1366)
            .height(748)
            .title("Expenditure Per Year")
            .xAxisTitle("YEAR")
            .yAxisTitle("EXPENSE")
            .theme(ChartTheme.XChart)
            .build();

    // Customize Chart
    chart.getStyler().setChartTitleVisible(true);
    chart.getStyler().setLegendPosition(LegendPosition.InsideNW);
    chart.getStyler().setYAxisLogarithmic(true);
    chart.getStyler().setXAxisLabelRotation(45);
    chart.getStyler().setPlotGridLinesVisible(false);
    chart.getStyler().setChartBackgroundColor(Color.white);
    chart.getStyler().setPlotBackgroundColor(Color.lightGray);
    chart.getStyler().setDefaultSeriesRenderStyle(XYSeries.XYSeriesRenderStyle.Step);
    chart.getStyler().setXAxisLabelAlignment(TextAlignment.Right);
    chart.getStyler().setXAxisLabelRotation(90);
    chart.getStyler().setXAxisLabelRotation(0);
    chart.getStyler().setToolTipsEnabled(true);
    chart.getStyler().setToolTipType(Styler.ToolTipType.yLabels);
    double max = 0;
    int i = 0;
    //chart.getStyler().setYAxisTicksVisible(false);
    try
    {
        Statement statement = con.createStatement();
        ResultSet resultSet = statement.executeQuery("SELECT * FROM libraryexpenditureperyear");
                while (resultSet.next()) 
                {
                    xData.add(Double.parseDouble(resultSet.getString("year")));
                    yData.add(Double.parseDouble(resultSet.getString("expenditure")));
                    if(yData.get(i)>max)
                        max=yData.get(i);
                    i++;
                }
    } catch (SQLException ex) {
        System.out.println(ex);
    }
    chart.getStyler().setYAxisMax(max);
    // Series
   chart.addSeries("EXPENDITURE PER YEAR", xData, yData);
    return chart;
  }
}