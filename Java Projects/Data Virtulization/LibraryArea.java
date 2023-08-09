/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.Color;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.knowm.xchart.PieChart;
import org.knowm.xchart.PieChartBuilder;
import org.knowm.xchart.PieSeries.PieSeriesRenderStyle;
import org.knowm.xchart.XChartPanel;
import org.knowm.xchart.demo.charts.ExampleChart;
import org.knowm.xchart.style.PieStyler.AnnotationType;
import org.knowm.xchart.style.Styler;
import org.knowm.xchart.style.Styler.ChartTheme;
import org.knowm.xchart.style.colors.BaseSeriesColors;
import org.knowm.xchart.style.colors.ChartColor;
public class LibraryArea implements ExampleChart<PieChart> {

  public XChartPanel getPanel() throws IOException {

    ExampleChart<PieChart> exampleChart = new LibraryArea();
    PieChart chart = exampleChart.getChart();
    XChartPanel panel=new XChartPanel(chart);
    return panel;
  }

  @Override
  public PieChart getChart() {
  Connection con = DbConnect.getConnection();
    // Create Chart
    PieChart chart =
        new PieChartBuilder()
            .width(1366)
            .height(748)
            .title("LIBRARY AREA IN SQUARE METRES")
            .theme(ChartTheme.GGPlot2).build();
    // Customize Chart
    chart.getStyler().setLegendVisible(true);
    chart.getStyler().setAnnotationType(AnnotationType.Label);
    chart.getStyler().setAnnotationDistance(.82);
    chart.getStyler().setPlotContentSize(.9);
    chart.getStyler().setDefaultSeriesRenderStyle(PieSeriesRenderStyle.Donut);
    chart.getStyler().setDecimalPattern("#");
    chart.getStyler().setSeriesColors(new BaseSeriesColors().getSeriesColors());
    chart.getStyler().setSumVisible(true);
    chart.getStyler().setSumFontSize(30f);
    chart.getStyler().setChartBackgroundColor(Color.LIGHT_GRAY);
    chart.getStyler().setToolTipsEnabled(true);
    chart.getStyler().setToolTipType(Styler.ToolTipType.yLabels);
    chart.getStyler().setPlotBackgroundColor(ChartColor.getAWTColor(ChartColor.WHITE));
    // Series
    try {
                Statement statement = con.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM libraryarea");
                double data = 0;
                String str = "";
                while (resultSet.next()) 
                {
                    str = resultSet.getString("TYPE");
                    data=(Double.parseDouble(resultSet.getString("AREA")));
                    chart.addSeries(str,data);
                }
            } 
    catch (NumberFormatException | SQLException e) 
    {
                System.out.println(e);
    }
    return chart;
  }
}