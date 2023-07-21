/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccApplication;

import java.sql.Connection;

/**
 *
 * @author Asus
 */
public class AccSystem extends javax.swing.JFrame {

    /**
     * Creates new form AccSystem
     */
    Connection con1;
    public AccSystem() {
        initComponents();
        con1=DBConnection.getConn();
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        background = new javax.swing.JLabel();
        jMenuItem1 = new javax.swing.JMenuItem();
        jPanel1 = new javax.swing.JPanel();
        logout = new javax.swing.JButton();
        jLabel1 = new javax.swing.JLabel();
        jMenuBar1 = new javax.swing.JMenuBar();
        jMenu1 = new javax.swing.JMenu();
        itemmenu = new javax.swing.JMenuItem();
        customer = new javax.swing.JMenuItem();
        jMenuItem2 = new javax.swing.JMenuItem();
        PurchaseMenu = new javax.swing.JMenu();
        purchform = new javax.swing.JMenuItem();
        jMenu3 = new javax.swing.JMenu();
        SalesForm = new javax.swing.JMenuItem();
        Report = new javax.swing.JMenu();
        jMenuItem3 = new javax.swing.JMenuItem();
        Srp = new javax.swing.JMenuItem();
        jMenuItem5 = new javax.swing.JMenuItem();

        background.setBackground(new java.awt.Color(204, 153, 0));
        background.setIcon(new javax.swing.ImageIcon(getClass().getResource("/AccApplication/Un44titled.png"))); // NOI18N

        jMenuItem1.setText("jMenuItem1");

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setBackground(new java.awt.Color(102, 255, 51));
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jPanel1.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        logout.setText("LOGOUT");
        logout.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                logoutActionPerformed(evt);
            }
        });
        jPanel1.add(logout, new org.netbeans.lib.awtextra.AbsoluteConstraints(800, 10, -1, 38));

        jLabel1.setIcon(new javax.swing.ImageIcon(getClass().getResource("/AccApplication/Un44titled.png"))); // NOI18N
        jPanel1.add(jLabel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 900, 580));

        getContentPane().add(jPanel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 890, 580));

        jMenu1.setText("AccMaster");

        itemmenu.setText("Item");
        itemmenu.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                itemmenuActionPerformed(evt);
            }
        });
        jMenu1.add(itemmenu);

        customer.setText("Customer");
        customer.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                customerActionPerformed(evt);
            }
        });
        jMenu1.add(customer);

        jMenuItem2.setText("Manufacturer");
        jMenuItem2.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jMenuItem2ActionPerformed(evt);
            }
        });
        jMenu1.add(jMenuItem2);

        jMenuBar1.add(jMenu1);

        PurchaseMenu.setText("Purchase");
        PurchaseMenu.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                PurchaseMenuActionPerformed(evt);
            }
        });

        purchform.setText("Purchase Form");
        purchform.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                purchformActionPerformed(evt);
            }
        });
        PurchaseMenu.add(purchform);

        jMenuBar1.add(PurchaseMenu);

        jMenu3.setText("Sales");

        SalesForm.setText("Sales Form");
        SalesForm.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                SalesFormActionPerformed(evt);
            }
        });
        jMenu3.add(SalesForm);

        jMenuBar1.add(jMenu3);

        Report.setText("Report");
        Report.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                ReportActionPerformed(evt);
            }
        });

        jMenuItem3.setText("Purchase Report");
        jMenuItem3.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jMenuItem3ActionPerformed(evt);
            }
        });
        Report.add(jMenuItem3);

        Srp.setText("Sales Report");
        Srp.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                SrpActionPerformed(evt);
            }
        });
        Report.add(Srp);

        jMenuItem5.setText("Stock Report");
        jMenuItem5.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jMenuItem5ActionPerformed(evt);
            }
        });
        Report.add(jMenuItem5);

        jMenuBar1.add(Report);

        setJMenuBar(jMenuBar1);

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void customerActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_customerActionPerformed
        // TODO add your handling code here:
        this.setVisible(false);
        Customer.main(new String[2]);
    }//GEN-LAST:event_customerActionPerformed

    private void itemmenuActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_itemmenuActionPerformed
        // TODO add your handling code here:
          this.setVisible(false);
          Item.main(new String[2]);
    }//GEN-LAST:event_itemmenuActionPerformed

    private void PurchaseMenuActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_PurchaseMenuActionPerformed
        this.setVisible(false);
        Purchase.main(new String[2]);
    }//GEN-LAST:event_PurchaseMenuActionPerformed

    private void purchformActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_purchformActionPerformed
    this.setVisible(false);
    Purchase.main(new String[2]);
    }//GEN-LAST:event_purchformActionPerformed

    private void logoutActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_logoutActionPerformed
        // TODO add your handling code here:
        this.setVisible(false);
        Login1.main(new String[3]);
    }//GEN-LAST:event_logoutActionPerformed

    private void SalesFormActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_SalesFormActionPerformed
        // TODO add your handling code here:S
          this.setVisible(false);
        Sales.main(new String[2]);
    }//GEN-LAST:event_SalesFormActionPerformed

    private void jMenuItem5ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jMenuItem5ActionPerformed
        // TODO add your handling code here:
        this.setVisible(false);
        StockReport.main(new String[2]);
    }//GEN-LAST:event_jMenuItem5ActionPerformed

    private void ReportActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_ReportActionPerformed
        // TODO add your handling code here:

    }//GEN-LAST:event_ReportActionPerformed

    private void jMenuItem3ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jMenuItem3ActionPerformed
        // TODO add your handling code here:
        this.setVisible(false);
        Preport.main(new String[2]);
    }//GEN-LAST:event_jMenuItem3ActionPerformed

    private void jMenuItem2ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jMenuItem2ActionPerformed
        // TODO add your handling code here:
        this.setVisible(false);
        Manufactures.main(new String[3]);
    }//GEN-LAST:event_jMenuItem2ActionPerformed

    private void SrpActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_SrpActionPerformed
        // TODO add your handling code here:
        this.setVisible(false);
        Sreport.main(new String[2]);
    }//GEN-LAST:event_SrpActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(AccSystem.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(AccSystem.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(AccSystem.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(AccSystem.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new AccSystem().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JMenu PurchaseMenu;
    private javax.swing.JMenu Report;
    private javax.swing.JMenuItem SalesForm;
    private javax.swing.JMenuItem Srp;
    private javax.swing.JLabel background;
    private javax.swing.JMenuItem customer;
    private javax.swing.JMenuItem itemmenu;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JMenu jMenu1;
    private javax.swing.JMenu jMenu3;
    private javax.swing.JMenuBar jMenuBar1;
    private javax.swing.JMenuItem jMenuItem1;
    private javax.swing.JMenuItem jMenuItem2;
    private javax.swing.JMenuItem jMenuItem3;
    private javax.swing.JMenuItem jMenuItem5;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JButton logout;
    private javax.swing.JMenuItem purchform;
    // End of variables declaration//GEN-END:variables
}
